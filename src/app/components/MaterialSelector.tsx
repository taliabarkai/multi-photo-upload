import imgColor from "figma:asset/c46b6316b65611a074bd90ed3bb7fa4597fc24b0.png";
import imgColor1 from "figma:asset/331a4d25f1e91a36bf5feec86759e97b221aa786.png";
import imgColor2 from "figma:asset/c4c0b2f50bd41b7a746cdf17313403f852def132.png";
import imgColor3 from "figma:asset/3ba45ac921e3690d772ef2aa7fc6bec36dea4a40.png";
import { useState } from "react";

export default function MaterialSelector() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('1');

  const materials = [
    { id: '1', name: 'Canvas 1', image: imgColor },
    { id: '2', name: 'Canvas 2', image: imgColor1 },
    { id: '3', name: 'Canvas 3', image: imgColor2 },
    { id: '4', name: 'Canvas 4', image: imgColor3 },
  ];

  return null;
}