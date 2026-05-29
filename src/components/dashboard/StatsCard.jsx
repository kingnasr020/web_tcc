import {
  ArrowUpRight,
} from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-[28px]
      p-6
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-1
      border border-slate-100
    "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 font-medium">
            {title}
          </p>

          <h2
            className="
            text-4xl
            font-extrabold
            mt-4
            text-slate-800
          "
          >
            {value}
          </h2>
        </div>

        <div
          className="
          w-16
          h-16
          rounded-3xl
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          flex
          items-center
          justify-center
          text-white
          shadow-lg
        "
        >
          <Icon size={28} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <ArrowUpRight
          size={18}
          className="text-green-500"
        />

        <span className="text-green-500 font-semibold">
          +12%
        </span>

        <span className="text-slate-400">
          bulan ini
        </span>
      </div>
    </div>
  );
};

export default StatsCard;