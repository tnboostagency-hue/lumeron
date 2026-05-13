import { PortalTicketDetailPanel } from "@/components/portal/portal-modules";

type Props = { params: Promise<{ id: string }> };

export default async function PortalTicketDetailPage({ params }: Props) {
  const { id } = await params;
  return <PortalTicketDetailPanel ticketId={decodeURIComponent(id)} />;
}
