function createImgBase(options) {
    const canvas = document.createElement('canvas');
    const text = options.content;
    // 因为要实现文字交错效果，所以这里生成两倍宽度的图片
    canvas.width = options.width * 2;
    canvas.height = options.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // X轴阴影距离，负值表示往上，正值表示往下
      ctx.shadowOffsetX = 2;
      // Y轴阴影距离，负值表示往左，正值表示往右
      ctx.shadowOffsetY = 2;
      // 阴影的模糊程度
      ctx.shadowBlur = 2;
      ctx.font = options.font;
      ctx.fillStyle = options.color;
      ctx.rotate(options.rotateDegree);
      ctx.textAlign = 'left';
      ctx.fillText(text, options.x, options.y);
    }
    return canvas.toDataURL('image/png');
  }
  

export function genWaterMark({
    className = 'watermarked',
    width = 340,
    height = 240,
    content = '水印',
    font = '14px PingFang SC, sans-serif',
    color = 'rgba(156, 162, 169, 0.3)',
    rotate = -14,
    position = 'absolute',
    top = 0,
    left = 0,
    zIndex = 1000,
  }) {
    const option = {
      width,
      height,
      content,
      font,
      color,
      rotateDegree: (rotate * Math.PI) / 180,
    };
    console.log(option,'l');
    // 为了实现交错水印的效果，此处生成两张位置不同的水印 固定相对位置
    const dataUri1 = createImgBase({
      ...option,
      x: 100,
      y: 140,
    });
    const dataUri2 = createImgBase({
      ...option,
      x: 300,
      y: 340,
    });
  
    let defaultStyle = document.createElement('style');
    defaultStyle.innerHTML = `.${className}:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      ${top || top === 0 ? `top: ${top}px;` : ''}
      ${left || left === 0 ? `left: ${left}px;` : ''}
      background-repeat: repeat;
      pointer-events: none;
    }`;
  
    let styleEl = document.createElement('style');
    styleEl.innerHTML = `.${className}:after
    {
      ${position ? `position: ${position}` : ''};
      ${zIndex ? `z-index:${zIndex}` : ''};
      background-image: url(${dataUri1}), url(${dataUri2});
      background-size: ${option.width * 2}px ${option.height}px;
    }`;
    document.head.appendChild(defaultStyle);
    document.head.appendChild(styleEl);
  }

//   https://juejin.cn/post/6946139702684549157

