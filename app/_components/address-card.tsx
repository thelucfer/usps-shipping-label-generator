export function AddressCard({ address, displayName }: { address: string; displayName?: string }) {
  return (
    <div className="flex flex-col">
      {displayName && <span>{displayName}</span>}
      <span className="text-xs text-muted-foreground">{address}</span>
    </div>
  )
}
