import { useState } from "react";
import { useAuth } from "./useAuth";

export function useRegisterForm() {
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "La contraseña debe contener al menos una mayúscula";
    }
    if (!/\d/.test(pwd)) {
      return "La contraseña debe contener al menos un número";
    }
    if (!/[@$!%*?&]/.test(pwd)) {
      return "La contraseña debe contener al menos un carácter especial (@$!%*?&)";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "El nombre es obligatorio";
    }

    if (!email.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "El email no es válido";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    await register({ name, email, password });
  };

  return {
    name,
    email,
    password,
    showPassword,
    validationErrors,
    isLoading,
    error,
    setName,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
    clearError,
  };
}
