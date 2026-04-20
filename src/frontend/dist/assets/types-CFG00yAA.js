const SERVICE_CATEGORIES = [
  { value: "homeRepair", label: "Home Repair", icon: "🔧" },
  { value: "cleaning", label: "Cleaning", icon: "🧹" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "it", label: "IT & Tech", icon: "💻" },
  { value: "marketing", label: "Marketing", icon: "📣" },
  { value: "garden", label: "Garden", icon: "🌱" },
  { value: "other", label: "Other", icon: "📦" }
];
function getCategoryInfo(cat) {
  return SERVICE_CATEGORIES.find((c) => c.value === cat) ?? {
    label: String(cat),
    icon: "📦"
  };
}
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(amount) / 100);
}
export {
  SERVICE_CATEGORIES as S,
  formatTimestamp as a,
  formatCurrency as f,
  getCategoryInfo as g
};
