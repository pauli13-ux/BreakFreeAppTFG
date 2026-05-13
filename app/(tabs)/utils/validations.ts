

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {

    return password.length >= 6;
};

export const getFormError = (email: string, pass: string, isRegister: boolean, confirmPass?: string): string | null => {
    if (!validateEmail(email)) return "El email no es válido.";
    if (!validatePassword(pass)) return "La contraseña debe tener al menos 6 caracteres.";
    if (isRegister && pass !== confirmPass) return "Las contraseñas no coinciden.";
    return null;
};