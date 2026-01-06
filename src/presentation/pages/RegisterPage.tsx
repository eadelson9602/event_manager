"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "../hooks";
import ErrorAlert from "../components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const {
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
  } = useRegisterForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <ErrorAlert message={error || ""} onClose={clearError} />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
                {validationErrors.name && (
                  <p className="text-sm text-destructive">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
                {validationErrors.email && (
                  <p className="text-sm text-destructive">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password123!"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-destructive">
                    {validationErrors.password}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Mínimo 8 caracteres, una mayúscula, un número y un carácter
                  especial (@$!%*?&)
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
