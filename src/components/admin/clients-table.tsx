"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Building2 } from "lucide-react";
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
import { ClientActions } from "./client-actions";
import type { Client } from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";

const clientCategories: Record<string, Record<Locale, string>> = {
  japanese: { vi: "Công ty Nhật Bản", en: "Japanese Companies", zh: "日本公司" },
  multinational: { vi: "Tập đoàn đa quốc gia", en: "Multinational Corporations", zh: "跨国企业" },
  construction: { vi: "Xây dựng & Kỹ thuật", en: "Construction & Engineering", zh: "建筑与工程" },
  developer: { vi: "Bất động sản", en: "Real Estate Developers", zh: "房地产开发商" },
  other: { vi: "Khác", en: "Other", zh: "其他" },
};

interface ClientsTableProps {
  clients: Client[];
  locale: string;
}

export function ClientsTable({
  clients,
  locale,
}: ClientsTableProps) {
  const router = useRouter();
  const t = useTranslations("admin.clients");
  const tCommon = useTranslations("common.toast");
  const [localItems, setLocalItems] = useState(clients);

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
    setLocalItems(clients);
  }, [clients]);

  // Get localized category
  const getCategoryLabel = (category: string) => {
    const cat = clientCategories[category];
    return cat ? cat[locale as Locale] || cat.en : category;
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
      const response = await fetch("/api/admin/clients/reorder", {
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
      setLocalItems(clients);
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
              <th className="pb-3 font-medium">{t("table.category")}</th>
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
              {localItems.map((client, index) => (
                <SortableRow key={client.id} id={client.id}>
                  <td className="py-4">
                    <Link
                      href={`/${locale}/admin-clients/${client.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {client.orderIndex}
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
                        {client.logoUrl ? (
                          <Image
                            src={client.logoUrl}
                            alt={client.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge variant="secondary">
                      {getCategoryLabel(client.category || "other")}
                    </Badge>
                  </td>
                  <td className="py-4">
                    {client.active ? (
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
                    <ClientActions client={client} locale={locale} />
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
