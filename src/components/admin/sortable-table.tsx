"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface SortableTableProps<T extends { id: string; orderIndex: number | null }> {
  items: T[];
  onReorder?: (updates: Array<{ id: string; orderIndex: number }>) => Promise<void>;
  children: (item: T, index: number) => React.ReactNode;
  reorderEndpoint: string;
}

export function SortableTable<T extends { id: string; orderIndex: number | null }>({
  items,
  onReorder,
  children,
  reorderEndpoint,
}: SortableTableProps<T>) {
  const router = useRouter();
  const tCommon = useTranslations("common.toast");
  const [localItems, setLocalItems] = useState(items);

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
    setLocalItems(items);
  }, [items]);

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
      const response = await fetch(reorderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      if (onReorder) {
        await onReorder(updates);
      }
      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error reordering:", error);
      toast.error(tCommon("updateError"));
      // Revert to original order
      setLocalItems(items);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {localItems.map((item, index) => children(item, index))}
      </SortableContext>
    </DndContext>
  );
}

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function SortableRow({ id, children, disabled }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={isDragging ? "bg-muted" : ""}
    >
      {children}
      <td className="w-10 py-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed"
          disabled={disabled}
          type="button"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

