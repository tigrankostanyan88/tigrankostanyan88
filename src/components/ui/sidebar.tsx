import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  key: string;
  name: string;
}

interface SidebarProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  categories: Category[];
}
const Sidebar: React.FC<SidebarProps> = ({
  onSelectCategory,
  selectedCategory,
  categories,
}) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-r border-border w-full lg:w-64 p-6 h-fit rounded-[15px] mb-8 lg:mb-0"
    >
      <h2 className="text-2xl font-display font-bold mb-6">{t("ourMenu")}</h2>
      <ul className="space-y-2 hidden lg:block">
        {categories.map((category) => (
          <li key={category.key}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(category.key);
              }}
              className={`block px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.key
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
