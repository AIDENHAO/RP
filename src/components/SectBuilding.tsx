import React, { useState } from 'react';
import './SectBuilding.css';

const SectBuilding: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const handleFloorClick = (floorNumber: number) => {
    setSelectedFloor(floorNumber);
    console.log(`点击了第${floorNumber}层`);
  };

  return (
    <div className="sect-building">
      <svg width="100%" height="100%" viewBox="0 0 600 450" className="building-svg">
        {/* 背景圆形平台 */}
        <ellipse cx="300" cy="420" rx="280" ry="20" fill="#1a2332" opacity="0.8" />
        
        {/* 主建筑 - 分层3D四棱锥 */}
        <g className="main-building">
          {/* 第一层（最底层） */}
          <g 
            className={`floor floor-1 ${selectedFloor === 1 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(1)}
            style={{ cursor: 'pointer' }}
          >
            {/* 底层四棱锥面 */}
            <polygon points="150,400 450,400 400,350 200,350" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="450,400 400,350 300,100 350,150" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="150,400 200,350 300,100 250,150" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 底面轮廓 */}
            <polygon points="150,400 450,400 400,350 200,350" 
                     fill="none" stroke="#666" strokeWidth="2" />
            
            {/* 内部结构线 */}
            <line x1="200" y1="350" x2="300" y2="100" stroke="#666" strokeWidth="1" opacity="0.6" />
            <line x1="400" y1="350" x2="300" y2="100" stroke="#666" strokeWidth="1" opacity="0.6" />
            <line x1="300" y1="375" x2="300" y2="100" stroke="#666" strokeWidth="1.5" opacity="0.8" />
            
            {/* 分层线 */}
            <line x1="175" y1="375" x2="425" y2="375" stroke="#666" strokeWidth="1" />
            <line x1="185" y1="360" x2="415" y2="360" stroke="#666" strokeWidth="0.8" />
            <line x1="195" y1="345" x2="405" y2="345" stroke="#666" strokeWidth="0.6" />
            
            <text x="300" y="390" textAnchor="middle" fill="#2d3748" fontSize="14" fontWeight="bold">第一层</text>
          </g>
          
          {/* 第二层 */}
          <g 
            className={`floor floor-2 ${selectedFloor === 2 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(2)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第二层四棱锥面 */}
            <polygon points="175,350 425,350 375,300 225,300" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="425,350 375,300 300,120 325,170" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="175,350 225,300 300,120 275,170" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="200" y1="325" x2="400" y2="325" stroke="#666" strokeWidth="1" />
            <line x1="210" y1="310" x2="390" y2="310" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="340" textAnchor="middle" fill="#2d3748" fontSize="13" fontWeight="bold">第二层</text>
          </g>
          
          {/* 第三层 */}
          <g 
            className={`floor floor-3 ${selectedFloor === 3 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(3)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第三层四棱锥面 */}
            <polygon points="200,300 400,300 350,250 250,250" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="400,300 350,250 300,140 325,190" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="200,300 250,250 300,140 275,190" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="225" y1="275" x2="375" y2="275" stroke="#666" strokeWidth="1" />
            <line x1="235" y1="260" x2="365" y2="260" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="290" textAnchor="middle" fill="#2d3748" fontSize="12" fontWeight="bold">第三层</text>
          </g>
          
          {/* 第四层 */}
          <g 
            className={`floor floor-4 ${selectedFloor === 4 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(4)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第四层四棱锥面 */}
            <polygon points="225,250 375,250 325,200 275,200" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="375,250 325,200 300,160 325,210" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="225,250 275,200 300,160 275,210" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="250" y1="225" x2="350" y2="225" stroke="#666" strokeWidth="1" />
            <line x1="260" y1="210" x2="340" y2="210" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="240" textAnchor="middle" fill="#2d3748" fontSize="11" fontWeight="bold">第四层</text>
          </g>
          
          {/* 第五层 */}
          <g 
            className={`floor floor-5 ${selectedFloor === 5 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(5)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第五层四棱锥面 */}
            <polygon points="250,200 350,200 315,160 285,160" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="350,200 315,160 300,180 315,220" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="250,200 285,160 300,180 285,220" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="270" y1="180" x2="330" y2="180" stroke="#666" strokeWidth="1" />
            <line x1="280" y1="170" x2="320" y2="170" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="190" textAnchor="middle" fill="#2d3748" fontSize="10" fontWeight="bold">第五层</text>
          </g>
          
          {/* 第六层 */}
          <g 
            className={`floor floor-6 ${selectedFloor === 6 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(6)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第六层四棱锥面 */}
            <polygon points="270,160 330,160 310,130 290,130" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="330,160 310,130 300,200 315,180" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="270,160 290,130 300,200 285,180" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="285" y1="145" x2="315" y2="145" stroke="#666" strokeWidth="1" />
            <line x1="290" y1="135" x2="310" y2="135" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="155" textAnchor="middle" fill="#2d3748" fontSize="9" fontWeight="bold">第六层</text>
          </g>
          
          {/* 第七层（塔顶） */}
          <g 
            className={`floor floor-7 ${selectedFloor === 7 ? 'selected' : ''}`}
            onClick={() => handleFloorClick(7)}
            style={{ cursor: 'pointer' }}
          >
            {/* 第七层四棱锥面 */}
            <polygon points="285,130 315,130 305,100 295,100" 
                     fill="#e2e8f0" stroke="#718096" strokeWidth="2" />
            <polygon points="315,130 305,100 300,220 310,150" 
                     fill="#cbd5e0" stroke="#4a5568" strokeWidth="2" />
            <polygon points="285,130 295,100 300,220 290,150" 
                     fill="#f7fafc" stroke="#718096" strokeWidth="2" />
            
            {/* 分层线 */}
            <line x1="290" y1="115" x2="310" y2="115" stroke="#666" strokeWidth="1" />
            <line x1="295" y1="105" x2="305" y2="105" stroke="#666" strokeWidth="0.8" />
            
            <text x="300" y="125" textAnchor="middle" fill="#2d3748" fontSize="8" fontWeight="bold">第七层</text>
          </g>
          
          {/* 四棱锥顶点 */}
          <g className="pyramid-top">
            <circle cx="300" cy="90" r="5" fill="#ffd700" stroke="#e6c200" strokeWidth="2" />
            <circle cx="300" cy="90" r="2" fill="#fff" />
          </g>
        </g>
        
        {/* 周围的修炼点 */}
        <g className="cultivation-points">
          {/* 上方修炼点 */}
          <circle cx="300" cy="120" r="25" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="300" y="128" textAnchor="middle" fill="#d4a574" fontSize="14" fontWeight="bold">🔥</text>
          
          {/* 左上修炼点 */}
          <circle cx="200" cy="180" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="200" y="188" textAnchor="middle" fill="#d4a574" fontSize="12">40</text>
          
          {/* 右上修炼点 */}
          <circle cx="400" cy="180" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="400" y="188" textAnchor="middle" fill="#d4a574" fontSize="12">🏛️</text>
          
          {/* 左侧修炼点 */}
          <circle cx="150" cy="260" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="150" y="268" textAnchor="middle" fill="#d4a574" fontSize="12">⚡</text>
          
          {/* 右侧修炼点 */}
          <circle cx="450" cy="260" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="450" y="268" textAnchor="middle" fill="#d4a574" fontSize="12">40</text>
          
          {/* 下方修炼点 */}
          <circle cx="180" cy="340" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="180" y="348" textAnchor="middle" fill="#d4a574" fontSize="12">40</text>
          
          <circle cx="240" cy="360" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="240" y="368" textAnchor="middle" fill="#d4a574" fontSize="12">🏛️</text>
          
          <circle cx="360" cy="360" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="360" y="368" textAnchor="middle" fill="#d4a574" fontSize="12">⚔️</text>
          
          <circle cx="420" cy="340" r="20" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="420" y="348" textAnchor="middle" fill="#d4a574" fontSize="12">⚡</text>
          
          {/* 底部特殊修炼点 */}
          <circle cx="220" cy="380" r="18" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="220" y="388" textAnchor="middle" fill="#d4a574" fontSize="12">⚡</text>
          
          <circle cx="380" cy="380" r="18" fill="#2a3441" stroke="#d4a574" strokeWidth="2" />
          <text x="380" y="388" textAnchor="middle" fill="#d4a574" fontSize="12">🔥</text>
        </g>
        
        {/* 连接线 */}
        <g className="connection-lines" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.6">
          {/* 主建筑到各个修炼点的连接 */}
          <path d="M 300 200 Q 250 160 300 120" />
          <path d="M 280 220 Q 240 200 200 180" />
          <path d="M 320 220 Q 360 200 400 180" />
          <path d="M 260 280 Q 200 270 150 260" />
          <path d="M 340 280 Q 400 270 450 260" />
          <path d="M 250 320 Q 210 330 180 340" />
          <path d="M 250 340 Q 245 350 240 360" />
          <path d="M 350 340 Q 355 350 360 360" />
          <path d="M 350 320 Q 390 330 420 340" />
          
          {/* 底部连接 */}
          <path d="M 250 360 Q 235 370 220 380" />
          <path d="M 350 360 Q 365 370 380 380" />
        </g>
        
        {/* 能量流动效果 */}
        <g className="energy-flow">
          <circle cx="300" cy="180" r="3" fill="#ffd700" opacity="0.8">
            <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default SectBuilding;