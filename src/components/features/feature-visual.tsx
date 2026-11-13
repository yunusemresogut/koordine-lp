import {
  AssistantMockup,
  ChatMockup,
  HrMockup,
  InventoryMockup,
  MapMockup,
  ProgressPaymentMockup,
  ReportDocumentMockup,
  TicketMockup,
  WorkPlanMockup,
  type ReportType,
} from "@/components/mockups";
import type { VisualKey } from "@/content/feature-details";
import { cn } from "@/lib/utils";
import { AssignmentHistoryVisual, OpeningCalendarVisual, PermissionMatrixVisual } from "./visuals";

const REPORT: Partial<Record<VisualKey, ReportType>> = {
  "report-daily": "daily",
  "report-hse": "hse",
  "report-ncr": "ncr",
  "report-method": "method",
  "report-material": "material",
  "report-checklist": "checklist",
};

/** A4 belge gibi dikey görseller geniş alanda sınırlanır */
export function isDocumentVisual(key: VisualKey) {
  return key in REPORT;
}

/** Asistan paneli gibi dar arayüzler */
export function isNarrowVisual(key: VisualKey) {
  return key.startsWith("assistant") || key === "assignment-history" || key === "permission-matrix" || key === "opening-calendar";
}

/**
 * VisualKey → ürün görseli. Mockup kütüphanesi değiştirilmez; yalnızca proplarıyla seçilir.
 * `frameDocument`: A4 belgeyi "Raporlar / Önizleme" penceresinde göster (hero için).
 */
export function FeatureVisual({ visual, className, frameDocument }: { visual: VisualKey; className?: string; frameDocument?: boolean }) {
  const report = REPORT[visual];
  if (report) return <ReportDocumentMockup type={report} frame={frameDocument} className={className} />;

  switch (visual) {
    case "map":
      return <MapMockup className={className} />;
    case "map-focus":
      return <MapMockup selectedId="lvt" showList={false} className={className} />;
    case "opening-calendar":
      return <OpeningCalendarVisual className={className} />;
    case "estimate":
      return <WorkPlanMockup view="estimate" className={className} />;
    case "gantt":
      return <WorkPlanMockup view="gantt" className={className} />;
    case "estimate-gantt":
      return <WorkPlanMockup view="both" className={className} />;
    case "payments":
      return <ProgressPaymentMockup view="payments" className={className} />;
    case "contracts":
      return <ProgressPaymentMockup view="contracts" className={className} />;
    case "invoices":
      return <ProgressPaymentMockup view="invoices" className={className} />;
    case "tickets-both":
      return <TicketMockup view="both" className={className} />;
    case "tickets-board":
      return <TicketMockup view="board" className={className} />;
    case "approvals":
      return <TicketMockup view="approvals" className={className} />;
    case "hr-both":
      return <HrMockup view="both" className={className} />;
    case "timesheet":
      return <HrMockup view="timesheet" className={className} />;
    case "certificates":
      return <HrMockup view="certificates" className={className} />;
    case "inventory":
      return <InventoryMockup className={className} />;
    case "assignment-history":
      return <AssignmentHistoryVisual className={className} />;
    case "chat":
      return <ChatMockup className={className} />;
    case "permission-matrix":
      return <PermissionMatrixVisual className={className} />;
    case "assistant-full":
      return <AssistantMockup variant="full" className={className} />;
    case "assistant-answer":
      return <AssistantMockup variant="answer" className={className} />;
    case "assistant-preview":
      return <AssistantMockup variant="preview" className={className} />;
    default:
      return <div className={cn(className)} />;
  }
}
