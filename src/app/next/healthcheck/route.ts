/**
 * Health check endpoint.
 * Returns 200 OK to confirm the application is running.
 * Used by load balancers, uptime monitors, and deployment infrastructure.
 */
export function GET(): Response {
  return Response.json({ status: 'ok' }, { status: 200 })
}
