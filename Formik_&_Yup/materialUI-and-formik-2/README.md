<h1 align="center">React Form Validation Using Fromik & Yup</h1>

### `Formik কি`

Formik হচ্ছে রিয়েক্ট এর একটি ওপেনর্সোস লাইব্রেরী যেটির মাধ্যমে খুবই অর্গানাইজ ভাবে এবং পারর্ফমেন্ট ওয়েতে রিয়েক্ট ফর্ম ফিল্ডের ডেটার স্টেট ম্যানেজ করা, এরর শো করানো এবং ফর্ম সাবমিশন করা যায়।

### `Yup কি`

Yup হচ্ছে মূলত একটি স্কিমা ভ্যালিডেটর যেটির মাধ্যমে Formik দিয়ে কালেক্ট করা ফিল্ডের ডেটা গুলি ভ্যালিডেট করতে পারি। এখানে Yup এর যায়গার অন্য যেকোন ভ্যালিডেটর ব্যবহার করা যায়। Yup খুবই ছোট এবং পারফমেন্ট একটি লাইব্রেরী।

Formik ইউজারেরা Yup দিয়ে ভ্যালিডেট করতে খুব বেশি কমর্ফোট ফিল করে এজন্য Formik শুধুমাত্র Yup এর জন্য একটি স্পেশাল প্রোপাটর্টি প্রোভাইড করে যেটির সংক্রিয়ভাবে Error Message গুলোকে অর্গানাইজ অবজেক্ট এ রুপান্তর করে Formik এর কাছে পাঠিয়ে দেয়।