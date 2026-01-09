import { useState, useEffect, useMemo, useRef, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEventStore } from "../../stores/event.store";
import { Event } from "../../../domain/entities/event.entity";

export function useEventForm(eventId?: number) {
  const router = useRouter();
  const {
    currentEvent,
    isLoading,
    error,
    fetchEventById,
    createEvent,
    updateEvent,
    clearError,
  } = useEventStore();

  // Track the last event ID we initialized with to avoid re-initializing
  const initializedEventIdRef = useRef<number | undefined>(undefined);

  // Memoize the initial form data from currentEvent
  const initialFormData = useMemo(() => {
    if (currentEvent && eventId && currentEvent.id === eventId) {
      const date = new Date(currentEvent.date);
      const localDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
      return {
        name: currentEvent.name || "",
        date: localDateTime,
        description: currentEvent.description || "",
        place: currentEvent.place || "",
      };
    }
    return {
      name: "",
      date: "",
      description: "",
      place: "",
    };
  }, [currentEvent, eventId]);

  // Initialize state with lazy initialization
  const [formData, setFormData] = useState(() => initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId).catch(() => {
        // Error handled by store
      });
    }
  }, [eventId, fetchEventById]);

  // Reset form data when eventId changes or when currentEvent loads for the first time
  useEffect(() => {
    if (currentEvent && eventId && currentEvent.id === eventId) {
      // Only initialize once per eventId
      if (initializedEventIdRef.current !== eventId) {
        const date = new Date(currentEvent.date);
        const localDateTime = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        // Use startTransition to mark this as a non-urgent update
        startTransition(() => {
          setFormData({
            name: currentEvent.name || "",
            date: localDateTime,
            description: currentEvent.description || "",
            place: currentEvent.place || "",
          });
        });

        initializedEventIdRef.current = eventId;
      }
    } else if (!eventId) {
      // Reset when switching to create mode
      initializedEventIdRef.current = undefined;
      startTransition(() => {
        setFormData({
          name: "",
          date: "",
          description: "",
          place: "",
        });
      });
    }
  }, [currentEvent, eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const eventData: Omit<Event, "id" | "createdAt" | "updatedAt"> = {
        name: formData.name,
        date: new Date(formData.date).toISOString(),
        description: formData.description || undefined,
        place: formData.place || undefined,
      };

      if (eventId) {
        await updateEvent(eventId, eventData);
        toast.success("Event updated successfully");
      } else {
        await createEvent(eventData);
        toast.success("Event created successfully");
      }
      router.push("/events");
    } catch {
      // Error handled by store
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    validationErrors,
    isLoading: isLoading && Boolean(eventId && !currentEvent),
    error,
    handleSubmit,
    updateField,
    clearError,
  };
}
