import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Temp() {
  const [items, setItems] = useState([
    { id: 1, color: "skyblue", side: "left" },
    { id: 2, color: "salmon", side: "left" },
    { id: 3, color: "lightgreen", side: "right" },
  ]);

  const moveItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, side: item.side === "left" ? "right" : "left" }
          : item
      )
    );
  };

  const renderItem = (item) => (
    <motion.div
      key={item.id}
      layoutId={`card-${item.id}`}
      onClick={() => moveItem(item.id)}
      style={{
        width: 100,
        height: 100,
        background: item.color,
        borderRadius: 10,
        marginBottom: 10,
        cursor: "pointer",
      }}
      transition={{ duration: 2 }}
    />
  );

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* Левый контейнер */}
      <div style={{ width: 120, minHeight: 220, border: "1px solid black", padding: 10 }}>
        <AnimatePresence >
          {items.filter((i) => i.side === "left").map(renderItem)}
        </AnimatePresence>
      </div>

      {/* Правый контейнер */}
      <div style={{ width: 120, minHeight: 220, border: "1px solid black", padding: 10 }}>
        <AnimatePresence >
          {items.filter((i) => i.side === "right").map(renderItem)}
        </AnimatePresence>
      </div>
    </div>
  );
}