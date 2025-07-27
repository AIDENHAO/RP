import React from 'react';
import './SectBuilding.css';

const SectBuilding: React.FC = () => {
  return (
    <div className="sect-building">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="building-svg">
        {/* 背景圆形平台 */}
        <ellipse cx="300" cy="380" rx="280" ry="20" fill="#1a2332" opacity="0.8" />
        
        {/* 主建筑 - 宝塔 */}
        <g className="main-building">
          {/* 塔基 */}
          <rect x="250" y="320" width="100" height="40" fill="#d4a574" rx="5" />
          
          {/* 第一层 */}
          <polygon 
            points="220,320 380,320 370,280 230,280" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="240" y="280" width="120" height="40" fill="#d4a574" />
          
          {/* 第二层 */}
          <polygon 
            points="240,280 360,280 350,240 250,240" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="260" y="240" width="80" height="40" fill="#d4a574" />
          
          {/* 第三层 */}
          <polygon 
            points="260,240 340,240 330,200 270,200" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="280" y="200" width="40" height="40" fill="#d4a574" />
          
          {/* 塔顶 */}
          <polygon 
            points="280,200 320,200 300,160" 
            fill="#f0c896" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          
          {/* 装饰元素 */}
          <circle cx="300" cy="180" r="8" fill="#ffd700" />
          <circle cx="300" cy="180" r="4" fill="#ffed4e" />
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