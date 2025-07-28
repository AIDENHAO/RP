import React from 'react';
import './TechniqueBuilding.css';

const TechniqueBuilding: React.FC = () => {
  return (
    <div className="technique-building">
      <svg width="100%" height="100%" viewBox="0 0 600 400" className="building-svg">
        {/* 背景圆形平台 */}
        <ellipse cx="300" cy="380" rx="280" ry="20" fill="#1a2332" opacity="0.8" />
        
        {/* 主建筑 - 功法阁 */}
        <g className="main-building">
          {/* 阁楼底座 */}
          <rect x="200" y="320" width="200" height="40" fill="#d4a574" rx="5" />
          
          {/* 第一层 - 功法阁主体 */}
          <polygon 
            points="180,320 420,320 410,280 190,280" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="200" y="280" width="200" height="40" fill="#d4a574" />
          
          {/* 第二层 */}
          <polygon 
            points="200,280 400,280 390,240 210,240" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="220" y="240" width="160" height="40" fill="#d4a574" />
          
          {/* 第三层 */}
          <polygon 
            points="220,240 380,240 370,200 230,200" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="240" y="200" width="120" height="40" fill="#d4a574" />
          
          {/* 第四层 */}
          <polygon 
            points="240,200 360,200 350,160 250,160" 
            fill="#e6b885" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          <rect x="260" y="160" width="80" height="40" fill="#d4a574" />
          
          {/* 阁顶 */}
          <polygon 
            points="260,160 340,160 300,120" 
            fill="#f0c896" 
            stroke="#c49660" 
            strokeWidth="1"
          />
          
          {/* 装饰元素 - 功法符文 */}
          <circle cx="300" cy="140" r="10" fill="#667eea" />
          <circle cx="300" cy="140" r="5" fill="#ffffff" />
          
          {/* 功法阁标识 */}
          <text x="300" y="155" textAnchor="middle" fill="#667eea" fontSize="12" fontWeight="bold">功</text>
        </g>
        
        {/* 周围的修炼点 - 功法相关 */}
        <g className="cultivation-points">
          {/* 上方修炼点 */}
          <circle cx="300" cy="100" r="25" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="300" y="108" textAnchor="middle" fill="#667eea" fontSize="14" fontWeight="bold">📖</text>
          
          {/* 左上修炼点 */}
          <circle cx="200" cy="160" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="200" y="168" textAnchor="middle" fill="#667eea" fontSize="12">心法</text>
          
          {/* 右上修炼点 */}
          <circle cx="400" cy="160" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="400" y="168" textAnchor="middle" fill="#667eea" fontSize="12">功法</text>
          
          {/* 左侧修炼点 */}
          <circle cx="150" cy="240" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="150" y="248" textAnchor="middle" fill="#667eea" fontSize="12">武技</text>
          
          {/* 右侧修炼点 */}
          <circle cx="450" cy="240" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="450" y="248" textAnchor="middle" fill="#667eea" fontSize="12">秘术</text>
          
          {/* 下方修炼点 */}
          <circle cx="180" cy="320" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="180" y="328" textAnchor="middle" fill="#667eea" fontSize="12">禁术</text>
          
          <circle cx="240" cy="340" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="240" y="348" textAnchor="middle" fill="#667eea" fontSize="12">修炼</text>
          
          <circle cx="360" cy="340" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="360" y="348" textAnchor="middle" fill="#667eea" fontSize="12">突破</text>
          
          <circle cx="420" cy="320" r="20" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="420" y="328" textAnchor="middle" fill="#667eea" fontSize="12">顿悟</text>
          
          {/* 底部特殊修炼点 */}
          <circle cx="220" cy="360" r="18" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="220" y="368" textAnchor="middle" fill="#667eea" fontSize="12">参悟</text>
          
          <circle cx="380" cy="360" r="18" fill="#2a3441" stroke="#667eea" strokeWidth="2" />
          <text x="380" y="368" textAnchor="middle" fill="#667eea" fontSize="12">传承</text>
        </g>
        
        {/* 连接线 */}
        <g className="connection-lines" stroke="#667eea" strokeWidth="2" fill="none" opacity="0.6">
          {/* 主建筑到各个修炼点的连接 */}
          <path d="M 300 160 Q 250 130 300 100" />
          <path d="M 280 180 Q 240 170 200 160" />
          <path d="M 320 180 Q 360 170 400 160" />
          <path d="M 260 240 Q 200 230 150 240" />
          <path d="M 340 240 Q 400 230 450 240" />
          <path d="M 250 280 Q 210 300 180 320" />
          <path d="M 250 300 Q 245 320 240 340" />
          <path d="M 350 300 Q 355 320 360 340" />
          <path d="M 350 280 Q 390 300 420 320" />
          
          {/* 底部连接 */}
          <path d="M 250 320 Q 235 340 220 360" />
          <path d="M 350 320 Q 365 340 380 360" />
        </g>
        
        {/* 能量流动效果 */}
        <g className="energy-flow">
          <circle cx="300" cy="140" r="3" fill="#667eea" opacity="0.8">
            <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default TechniqueBuilding; 