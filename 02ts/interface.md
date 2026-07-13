خیلی کامل و ساده توضیح می‌دم که **interface** در TypeScript چیه، کجاها به کار میاد و چه کاربردی داره.

---

## Interface (رابط) چیست؟

Interface یک **قرارداد (contract)** برای شکل یک شیء است.  
یعنی می‌توانیم با آن مشخص کنیم که یک شیء **چه propertyهایی**، با چه نوعی و چه ساختاری باید داشته باشد.

به زبان خودمونی: Interface مثل یک قالب یا شناسنامه برای اشیا عمل می‌کند؛ هر چیزی که ادعا کند از این Interface است، **باید** ساختار تعریف‌شده را رعایت کند.

### یک مثال ساده

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return `سلام ${person.name}، تو ${person.age} سالته.`;
}

const user = { name: "علی", age: 30 };
console.log(greet(user)); // سلام علی، تو ۳۰ سالته.
```

- `Person` یک Interface است که می‌گوید هر شیء از این نوع باید دو تا property داشته باشد: `name` (از نوع `string`) و `age` (از نوع `number`).
- تابع `greet` یک پارامتر `person` از نوع `Person` می‌گیرد.  
- اگر شیء `user` فاقد `name` یا `age` باشد یا نوعشان اشتباه باشد، TypeScript هنگام کامپایل (و در ادیتور) خطا می‌دهد.

---

## کاربردهای اصلی Interface

### ۱. تعریف شکل (Shape) اشیاء
رایج‌ترین کاربرد: وقتی داده‌ای مثل کاربر، محصول، تنظیمات یا پاسخ API دارید، با Interface شکل آن را مشخص کنید.

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
}
```

### ۲. تعریف امضای توابع (Function Signature)
می‌توان Interface را برای یک تابع تعریف کرد:

```typescript
interface SearchFunction {
  (query: string, limit: number): string[];
}

const search: SearchFunction = (q, l) => {
  return [`${q}1`, `${q}2`];
};
```

### ۳. تعریف ساختار کلاس‌ها (implements)
با `implements` یک کلاس را مجبور می‌کنیم که Propertyها و متدهای مشخصی را داشته باشد:

```typescript
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}
  makeSound() {
    console.log("هاپ هاپ");
  }
}
```
اینجا `Dog` باید `name` و `makeSound` را داشته باشد، وگرنه خطا می‌گیریم.

### ۴. ارث‌بری Interfaceها (extends)
می‌توان Interfaceها را مثل کلاس‌ها گسترش داد:

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const emp: Employee = {
  name: "زهرا",
  age: 28,
  employeeId: 123,
  department: "فنی"
};
```
`Employee` همه چیزهای `Person` را دارد به‌اضافه ویژگی‌های جدید.

### ۵. پراپرتی‌های اختیاری و فقط خواندنی
- **اختیاری (`?`)** : یعنی ممکن است وجود نداشته باشد.  
- **`readonly`** : فقط در زمان ایجاد مقدار می‌گیرد، بعداً تغییر نمی‌کند.

```typescript
interface Config {
  readonly apiUrl: string;
  timeout?: number;   // اختیاری
}

const config: Config = { apiUrl: "https://api.example.com" };
// config.apiUrl = "چیز دیگر"; // خطا: readonly
```

### ۶. امضای ایندکس (Index Signature)
وقتی نمی‌دانیم اسم propertyها دقیقاً چیست، اما نوعشان را می‌دانیم:

```typescript
interface Dictionary {
  [key: string]: number;  // کلید رشته‌ای، مقدار عددی
}

const scores: Dictionary = {
  math: 20,
  physics: 18
};
```

### ۷. توصیف APIهای خارجی
در پروژه‌های واقعی، وقتی از کتابخانه‌ها استفاده می‌کنید، اغلب Interface می‌سازید تا شکل داده‌های ورودی/خروجی را مشخص کنید و TypeScript اشتباهات را بگیرد.

---

## Interface در مقابل Type (نکته تکمیلی)

TypeScript یک `type` هم دارد که خیلی شبیه Interface است. تفاوت‌های مهم:
- `interface` فقط برای اشیاء (و توابع) استفاده می‌شود، ولی `type` می‌تواند یونیون (`string | number`)، تاپل و ... را هم تعریف کند.
- `interface` قابلیت **Declaration Merging** دارد: یعنی می‌توان در چند جا یک Interface به همین نام تعریف کرد و خودش merge می‌شوند. `type` این ویژگی را ندارد.
- به‌طور کلی، برای تعریف شکل اشیاء (Object Types) معمولاً Interface ارجح است، مگر اینکه به امکانات خاص type نیاز داشته باشید.

---

## چرا از Interface استفاده می‌کنیم؟ (فواید)

- **تشخیص خطا در زمان توسعه (Compile-time checking)**: اگر ساختاری که به تابع می‌دهید مطابق Interface نباشد، همان موقع خطا می‌گیرید، نه هنگام اجرا.
- **خودکارسازی و IntelliSense**: ادیتورها پیشنهادهای عالی می‌دهند و می‌دانند چه Propertyهایی مجاز است.
- **مستندسازی زنده کد**: با نگاه به Interfaceها می‌توان فهمید هر داده‌ای چه شکلی دارد.
- **افزایش خوانایی و نگهداری**: وقتی قراردادی واضح تعریف شود، تغییرات بعدی راحت‌تر و ایمن‌تر است.

---

## یک مثال کاربردی در دنیای واقعی

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

async function fetchUser(): Promise<ApiResponse<User>> {
  // فرضاً درخواست HTTP
  return {
    data: { id: 1, email: "a@b.com", name: "رضا" },
    status: 200,
    message: "OK"
  };
}
```
اینجا `ApiResponse` یک Interface جنریک است که با `User` پر شده، و تضمین می‌کند پاسخ سرور همیشه همان ساختار را دارد.

---

## خلاصه

**Interface** یک ابزار قدرتمند در TypeScript است برای:
- تعیین شکل اشیاء، توابع و کلاس‌ها
- برقراری انضباط و قرارداد در کد
- گرفتن خطاهای مرتبط با ساختار داده قبل از اجرا

اگر بخواهید می‌توانم توضیح دهم که فرق `interface` با `type` دقیق‌تر چیست، یا مثال‌های عمیق‌تری بزنم. 😊