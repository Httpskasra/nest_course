interface User {
  id: number;
  name: string;
  email: string;
}

// Partial: برای update
function updateUser(id: number, changes: Partial<User>) { /* ... */ }

// Required: در سیستم validation
type RequiredUser = Required<User>; // all fields required (none optional)

// Pick: ارسال خلاصه کاربر
type UserSummary = Pick<User, "id" | "name">;

// Omit: نمایش بدون اطلاعات حساس
type PublicUser = Omit<User, "email">;

// Record: نگهداری کش
const cache: Record<string, User> = {};

// Parameters & ReturnType: در دکوراتورها
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: Parameters<typeof original>) {
    const result: ReturnType<typeof original> = original.apply(this, args);
    console.log(`Called ${key} with`, args, "returned", result);
    return result;
  };
}