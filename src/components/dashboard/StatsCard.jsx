import {
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend = 0, // Ini kuncinya! Default-nya 0 kalau tidak ada data yang dikirim
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

      {/* Bagian Bawah yang Sudah Dibikin Dinamis */}
      <div className="flex items-center gap-2 mt-6">
        {trend > 0 ? (
          <ArrowUpRight size={18} className="text-green-500" />
        ) : trend < 0 ? (
          <ArrowDownRight size={18} className="text-red-500" />
        ) : (
          <Minus size={18} className="text-slate-400" />
        )}

        <span
          className={`font-semibold ${
            trend > 0
              ? "text-green-500"
              : trend < 0
              ? "text-red-500"
              : "text-slate-400"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>

        <span className="text-slate-400">
          bulan ini
        </span>
      </div>
    </div>
  );
};

export default StatsCard;