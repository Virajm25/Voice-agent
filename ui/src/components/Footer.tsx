import { BRAND_NAME } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background px-6 py-4">
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {BRAND_NAME}
      </p>
    </footer>
  );
}
