import { Boxes, ChartNoAxesColumnIncreasing, CircleDollarSign } from 'lucide-react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function StatsGrid({ stats }) {
  const items = [
    {
      label: 'Products',
      value: stats.count,
      icon: Boxes,
      tone: 'bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300',
    },
    {
      label: 'Total value',
      value: currency.format(stats.totalValue),
      icon: CircleDollarSign,
      tone:
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300',
    },
    {
      label: 'Average price',
      value: currency.format(stats.average),
      icon: ChartNoAxesColumnIncreasing,
      tone:
        'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
    },
  ];

  return (
    <section className="grid gap-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="theme-surface flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="label">{item.label}</p>
              <p className="theme-text mt-1 text-2xl font-extrabold">
                {item.value}
              </p>
            </div>
            <div className={`flex size-10 items-center justify-center rounded-md ${item.tone}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
