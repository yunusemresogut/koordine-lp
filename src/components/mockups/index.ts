/**
 * Koordine ürün görselleri (HTML/CSS ile çizilmiş arayüz parçaları).
 * Hepsi server component; kökte role="img" + aria-label, içerik aria-hidden.
 * Kapsayıcı genişliğine göre (container query) sadeleşir; viewport'a bağlı değildir.
 */
export { AppFrame } from "./app-frame";
export { MapMockup } from "./map-mockup";
export { ProgressPaymentMockup } from "./progress-payment-mockup";
export { ReportDocumentMockup, REPORT_TYPES, type ReportType } from "./report-document-mockup";
export { WorkPlanMockup } from "./work-plan-mockup";
export { TicketMockup } from "./ticket-mockup";
export { AssistantMockup } from "./assistant-mockup";
export { HrMockup } from "./hr-mockup";
export { InventoryMockup } from "./inventory-mockup";
export { ChatMockup } from "./chat-mockup";
export { Badge, StatusBadge, SITE_STATUS, type SiteStatus, type Tone } from "./primitives";
export { mockSites, type MockSite } from "./data";
