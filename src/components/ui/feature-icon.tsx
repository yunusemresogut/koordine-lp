import {
  FileText,
  GitPullRequestArrow,
  MapPinned,
  MessagesSquare,
  Package,
  ReceiptText,
  Ruler,
  Sparkles,
  Users,
  type LucideProps,
} from "lucide-react";
import type { Feature } from "@/content/features";

const ICONS = {
  map: MapPinned,
  ruler: Ruler,
  receipt: ReceiptText,
  "file-text": FileText,
  "git-pull-request": GitPullRequestArrow,
  users: Users,
  package: Package,
  messages: MessagesSquare,
  sparkles: Sparkles,
} satisfies Record<Feature["icon"], React.ComponentType<LucideProps>>;

/** Modül ikonu; ince çizgi (1.5) ile teknik çizim diline uyar */
export function FeatureIcon({ name, ...props }: { name: Feature["icon"] } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden strokeWidth={1.5} {...props} />;
}
