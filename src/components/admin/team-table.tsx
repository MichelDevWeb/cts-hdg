"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Users } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "./sortable-table";
import { TeamMemberActions } from "./team-member-actions";
import type { TeamMember } from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";

interface TeamTableProps {
  members: TeamMember[];
  locale: string;
  onEdit?: (member: TeamMember) => void;
}

export function TeamTable({
  members,
  locale,
  onEdit,
}: TeamTableProps) {
  const router = useRouter();
  const t = useTranslations("admin.team");
  const tCommon = useTranslations("common.toast");
  const [localItems, setLocalItems] = useState(members);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalItems(members);
  }, [members]);

  // Get localized role
  const getLocalizedRole = (member: TeamMember) => {
    switch (locale as Locale) {
      case "vi":
        return member.roleVi;
      case "zh":
        return member.roleZh;
      default:
        return member.roleEn;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localItems.findIndex((item) => item.id === active.id);
    const newIndex = localItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newItems = arrayMove(localItems, oldIndex, newIndex);
    setLocalItems(newItems);

    // Update orderIndex based on new position
    const updates = newItems.map((item, index) => ({
      id: item.id,
      orderIndex: index,
    }));

    try {
      const response = await fetch("/api/admin/team/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error reordering:", error);
      toast.error(tCommon("updateError"));
      // Revert to original order
      setLocalItems(members);
    }
  };

  return (
    <div className="overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-muted-foreground">
              <th className="pb-3 font-medium w-10">#</th>
              <th className="pb-3 font-medium">{t("table.name")}</th>
              <th className="pb-3 font-medium">{t("table.role")}</th>
              <th className="pb-3 font-medium">{t("table.status")}</th>
              <th className="pb-3 font-medium">{t("table.actions")}</th>
              <th className="pb-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={localItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {localItems.map((member, index) => (
                <SortableRow key={member.id} id={member.id}>
                  <td className="py-4">
                    <Link
                      href={`/${locale}/admin-team/${member.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {member.orderIndex}
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-hdg-blue-100">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Users className="h-5 w-5 text-hdg-blue-400" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    {getLocalizedRole(member)}
                  </td>
                  <td className="py-4">
                    {member.active ? (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Eye className="h-4 w-4" />
                        {t("status.active")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <EyeOff className="h-4 w-4" />
                        {t("status.inactive")}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <TeamMemberActions
                      member={member}
                      locale={locale}
                      onEdit={onEdit}
                    />
                  </td>
                </SortableRow>
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}
