import { ArrowUpRight } from "lucide-react";

const ContactCard = ({
  icon,
  title,
  value,
  link,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-8
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-cyan-300
      hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]
      "
    >
      <div className="flex justify-between items-center">

        <div className="text-cyan-300">
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          className="
          transition-transform
          duration-300
          group-hover:-translate-y-1
          group-hover:translate-x-1
          "
        />

      </div>

      <p className="mt-10 text-xs tracking-[0.35em] uppercase text-white/40">
        {title}
      </p>

      <h3 className="mt-3 text-xl text-white break-all">
        {value}
      </h3>

    </a>
  );
};

export default ContactCard;