/** Color options for V3 multi-personalization modal — shared with IE display labels. */
export const COLOR_SWATCHES: { id: string; label: string; className: string }[] = [
  { id: '1', label: 'Gold', className: 'bg-[#d4af37]' },
  { id: '2', label: 'Silver', className: 'bg-[#c0c0c0]' },
  { id: '3', label: 'Rose gold', className: 'bg-[#b76e79]' },
  { id: '4', label: 'Black', className: 'bg-[#1a1a1a]' },
];

export function colorLabelFromSwatchId(id: string | undefined): string {
  if (!id) return '—';
  return COLOR_SWATCHES.find((s) => s.id === id)?.label ?? id;
}
