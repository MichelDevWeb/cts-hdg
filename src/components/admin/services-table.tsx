"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
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
import { ServiceActions } from "./service-actions";
import { iconMap } from "@/lib/utils";
import type { Service } from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";

interface ServicesTableProps {
  services: Service[];
  locale: string;
  onEdit?: (service: Service) => void;
}

export function ServicesTable({
  services,
  locale,
  onEdit,
}: ServicesTableProps) {
  const router = useRouter();
  const t = useTranslations("admin.services");
  const tCommon = useTranslations("common.toast");
  const [localItems, setLocalItems] = useState(services);

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
    setLocalItems(services);
  }, [services]);

  const getLocalizedName = (service: Service) => {
    switch (locale as Locale) {
      case "vi":
        return service.nameVi;
      case "zh":
        return service.nameZh;
      default:
        return service.nameEn;
    }
  };

  const getLocalizedDescription = (service: Service) => {
    switch (locale as Locale) {
      case "vi":
        return service.descriptionVi;
      case "zh":
        return service.descriptionZh;
      default:
        return service.descriptionEn;
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
      const response = await fetch("/api/admin/services/reorder", {
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
      setLocalItems(services);
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
              <th className="pb-3 font-medium">
                {t("table.description")}
              </th>
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
              {localItems.map((service, index) => (
                <SortableRow key={service.id} id={service.id}>
                  <td className="py-4">
                    <Link
                      href={`/${locale}/admin-services/${service.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {service.orderIndex}
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        {service.icon && iconMap[service.icon] ? (
                          iconMap[service.icon]
                        ) : (
                          <Settings className="h-5 w-5" />
                        )}
                      </div>
                      <span className="font-medium">
                        {getLocalizedName(service)}
                      </span>
                    </div>
                  </td>
                  <td className="max-w-xs truncate py-4 text-sm text-muted-foreground">
                    {getLocalizedDescription(service)}
                  </td>
                  <td className="py-4">
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <ServiceActions
                      service={service}
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
