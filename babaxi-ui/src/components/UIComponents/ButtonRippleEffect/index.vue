<template>
    <!-- 适合做登录或者某种一次性功能按钮，用来做电梯导航按钮不太合适 -->
    <div class="container">
        <a data-animation="ripple" :href=href>
            <!-- {{ href }} -->
            <slot></slot>
        </a>
    </div>
</template>
<script>

export default {
    props:{
        href:{
            type: String
        },
    },
    name: 'BtnCssTest',
    components: {},
    data(){return{}},
    mounted() {
        window["tmripple"] =
                // 自执行函数 ---》 匿名函数 那就是在 function 前面加一个操作符，这样js引擎在解析的时候就不会把它当成是函数声明了
         (function(modules) { // webpackBootstrap
         	// The module cache 模块缓存
         	var installedModules = {};
        
         	// The require function require 函数
         	function __webpack_require__(moduleId) {
         		// Check if module is in cache 检查模块是否在缓存中
         		if(installedModules[moduleId]) {
         			return installedModules[moduleId].exports;
         		}
         		// Create a new module (and put it into the cache) 创建一个新模块（并将其放入缓存中）
         		var module = installedModules[moduleId] = {
         			i: moduleId,
         			l: false,
         			exports: {}
         		};
        
         		// Execute the module function 执行模块函数
         		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        
         		// Flag the module as loaded 将模块标记为已加载
         		module.l = true;
        
         		// Return the exports of the module 返回模块的导出
         		return module.exports;
         	}
        
         	// expose the modules object (__webpack_modules__) 公开 Modules 对象 （__webpack_modules__）
         	__webpack_require__.m = modules;
        
         	// expose the module cache 公开模块缓存
         	__webpack_require__.c = installedModules;
        
         	// define getter function for harmony exports 定义 Harmony 导出的 getter 函数
         	__webpack_require__.d = function(exports, name, getter) {
         		if(!__webpack_require__.o(exports, name)) {
         			Object.defineProperty(exports, name, {
         				configurable: false,
         				enumerable: true,
         				get: getter
         			});
         		}
         	};
        
         	// getDefaultExport function for compatibility with non-harmony modules getDefaultExport 函数，用于与非和谐模块兼容
         	__webpack_require__.n = function(module) {
         		var getter = module && module.__esModule ?
         			function getDefault() { return module['default']; } :
         			function getModuleExports() { return module; };
         		__webpack_require__.d(getter, 'a', getter);
         		return getter;
         	};
        
         	// Object.prototype.hasOwnProperty.call Object.prototype.hasOwnProperty.调用
         	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        
         	// __webpack_public_path__
         	__webpack_require__.p = "";
        
         	// Load entry module and return exports 加载输入模块和返回导出
         	return __webpack_require__(__webpack_require__.s = 0);
         })
         ([
            (function(module, exports, __webpack_require__) {

                "use strict";

                // Default Settings
                var settings = {
                    area: "",
                    color: "rgba(255, 255, 255, 0.4)",
                    offsetEl: null,
                    eventListener: "click",
                    mouseMove: false
                };

                /**
                 * @description Where the magic happens
                 * @ps 6，魔法起源之地，点击后触发，就是那个涟漪，是在这里面发生的
                 * @param {object} e
                 * @param {string} rippleColor
                 * @param {string} eventListener
                 */
                function ripple(e, rippleColor, eventListener) {
                    // e：PointerEvent  PointerEvent 接口代表了由 指针 引发的 DOM 事件的状态，包括接触点的位置，引发事件的设备类型，接触表面受到的压力等。
                    // 指针 是输入设备的硬件层抽象（比如鼠标，触摸笔，或触摸屏上的一个触摸点）。指针 能指向一个具体表面（如屏幕）上的一个（或一组）坐标。
                    // 指针的 击中检测 指浏览器用来检测 指针事件的目标元素的过程。大多数情况下，这个目标元素是由 指针的位置和元素在文章中的位置和分层共同决定的。
                    // eventListener的类型 string
                    // console.log("eventListener的类型", typeof(eventListener))
                    var clickedEl = e.currentTarget;// 返回element对象（对事件当前注册的目标的引用）,就是监听事件绑定的那个元素，你理解的没错
                    // match() 方法将字符串与正则表达式进行匹配。
                    // 移动端特有 changedTouches，非移动端 clientX
                    var PageX = eventListener.match(/touch/) ? e.changedTouches[0].pageX : e.clientX;
                    var PageY = eventListener.match(/touch/) ? e.changedTouches[0].pageY : e.clientY;

                    // 此处为a标签按钮的宽度吧 没错就是他的宽度
                    var btnWidth = clickedEl.clientWidth;
                    // Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
                    var el = clickedEl.getBoundingClientRect();

                    var rippleOffset = settings.offsetEl ? settings.offsetEl.clientHeight : 0;

                    var btnOffsetTop = el.top + rippleOffset;
                    var btnOffsetLeft = el.left;
                    // 定位到元素左上角坐标位置

                    var posMouseX = PageX;
                    var posMouseY = PageY + rippleOffset;
                    // 定位到鼠标点击位置

                    var rippleX = posMouseX - btnOffsetLeft;
                    var rippleY = posMouseY - btnOffsetTop;

                    var baseCSS = "\n          position: absolute;\n          width: " + btnWidth * 2 + "px;\n          height: " + btnWidth * 2 + "px;\n          border-radius: 50%;\n          transition: transform 700ms, opacity 700ms;\n          transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);\n          background: " + rippleColor + ";\n          background-position: center;\n          background-repeat: no-repeat;\n          background-size: 100%;\n          left: " + (rippleX - btnWidth) + "px;\n          top: " + (rippleY - btnWidth) + "px;\n          transform: scale(0);\n          pointer-events: none;\n      ";
                    /*
                        position: absolute; // 绝对定位了，以屏幕为基准的
                        
                        width: " + btnWidth * 2 + "px;          
                        height: " + btnWidth * 2 + "px;          
                        border-radius: 50%;  
                        // 这就是个圆了

                        // transition CSS 属性是 transition-property、transition-duration、transition-timing-function 和 transition-delay 的一个简写属性 (en-US)。
                        transition: transform 700ms, opacity 700ms;    
                            
                        // cubic-bezier(x1,y1,x2,y2)  
                        // P0 为 (0, 0)，代表初始时间和初始状态，P3 为 (1, 1)，代表最终时间和最终状态
                        // 其余的中间点 P1(x1,y1)、P2(x2,y2) 是可以动态改变的两个点
                        // (0, 0) ---> P1(x1,y1) ---> P2(x2,y2) ---> (1, 1)
                        // (0, 0) ---> P1(0.25, 0.46) ---> P2(0.45, 0.94) ---> (1, 1)
                        transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);      

                        background: " + rippleColor + ";          
                        background-position: center;     
                        background-repeat: no-repeat;      
                        background-size: 100%;

                        left: " + (rippleX - btnWidth) + "px;
                        top: " + (rippleY - btnWidth) + "px;
                        // 这两个是偏移量
                        
                        // 动画，图片向中心点塌缩，最后消失，不清楚具体表达什么效果
                        transform: scale(0);

                        // none:元素永远不会成为鼠标事件的target
                        pointer-events: none;
                    */

                    // Prepare the dom
                    // 准备 这个 dom元素？
                    var rippleEffect = document.createElement("span");
                    rippleEffect.style.cssText = baseCSS;

                    // Add some css for prevent overflow errors
                    // 添加一些 css 以防止溢出错误
                    clickedEl.style.overflow = "hidden";

                    // Check if the element is not static  because the ripple is in absolute
                    // 检查 元件是不是非静态的，因为纹波是绝对的
                    if (window.getComputedStyle(clickedEl).position === "static") {
                        clickedEl.style.position = "relative";
                    }

                    // Check for the mousemove event
                    // 检查 mousemove 事件
                    if (settings.mouseMove) {
                        settings.mouseMove = false;
                        return;
                    }

                    // 将处理好的span元素添加到a元素子集中
                    clickedEl.appendChild(rippleEffect);

                    // start animation
                    // 开始动画
                    requestAnimationFrame(function () {
                        rippleEffect.style.cssText = baseCSS + " transform: scale(1); opacity: 0;";
                    });

                    setTimeout(function () {
                        rippleEffect.remove();
                        // console.log("涟漪移除");
                    }, 700);
                }

                /**
                 * @description Prevent ripple when scrolling (Mobile Only)
                 * @param {string} eventListener
                 */
                // dcwxe 已注释 此函数判断当前场景下无意义 20240111
                // 补充：touchmove为事件在触点于触控平面上移动时触发。猜测与触屏移动设备适配有关
                // function onDrag(eventListener) {
                //     console.log("onDrag----eventListener:",eventListener);
                //     if (eventListener === "touchend") {
                //         document.getElementsByTagName("body")[0].addEventListener("touchmove", function () {
                //             settings.mouseMove = true;
                //         });
                //     }
                // }

                function attachRipple(els, rippleColor, eventListener) {
                    for (var i = 0; i < els.length; i += 1) {
                        var currentBtn = els[i];
                        // 不考虑触屏适配问题，此处添加了一个click事件
                        currentBtn.addEventListener(eventListener, function (e) {
                            // 补充说明一下：e function在普通情况下e就是个形参，但是一旦用作监听鼠标相关的动作事件后，e则代表“鼠标行为”这个对象了
                            return ripple(e, rippleColor, eventListener);
                        });
                    }
                }

                function attachRippleToAttribute(area, rippleColor, eventListener) {
                    var attributeEl = document.querySelectorAll(area + " [data-animation='ripple']");

                    if (attributeEl.length > 0) {
                        attachRipple(attributeEl, rippleColor, eventListener);
                    } else {
                        throw new Error('not found any element with data-animation="ripple"');
                    }
                }

                // dcwxe 走流程没发现这个函数被调用啊
                // function attachRippleToSelectors(selectors, rippleColor, eventListener) {
                //     if (selectors) {
                //         var selectorsEl = document.querySelectorAll(selectors);
                //     } else {
                //         throw new Error("You have to enter at least 1 selector");
                //     }

                //     if (selectorsEl.length > 0) {
                //         attachRipple(selectorsEl, rippleColor, eventListener);
                //     } else {
                //         console.warn("No element found with this selector: ", selectors);
                //     }
                // }

                module.exports = {
                    init: function init() {
                        // console.log("我他妈来啦！");
                        // Arguments 对象：arguments 是一个对应于传递给函数的参数的类数组对象。
                        // arguments对象不是一个 Array 。它类似于Array，但除了 length 属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
                        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        try {
                            var area = settings.area,
                                color = settings.color,
                                offsetEl = settings.offsetEl,
                                eventListener = settings.eventListener;
                                
                            area = data.area || area;
                            color = data.color || color;
                            offsetEl = data.offsetEl ? this.setOffsetEl(data.offsetEl) : offsetEl;
                            eventListener = data.eventListener || eventListener;

                            // dcwxe 已注释 此函数判断当前场景下无意义 20240111
                            // onDrag(eventListener);
                            attachRippleToAttribute(area, color, eventListener);
                        } catch (e) {
                            console.warn(e.message);
                        }
                    },
                    // attachToSelectors: function attachToSelectors() {
                    //     var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    //     try {
                    //         var elSetting = {
                    //             color: data.color || settings.color,
                    //             eventListener: data.eventListener || settings.eventListener
                    //         };
                    //         var color = elSetting.color,
                    //             eventListener = elSetting.eventListener;
                    //         attachRippleToSelectors(data.selectors, color, eventListener);
                    //     } catch (e) {
                    //         console.warn(e.message);
                    //     }
                    // },
                    setOffsetEl: function setOffsetEl(el) {
                        settings.offsetEl = document.querySelector(el);
                    },

                    ripple: ripple
                };
            })
         ]);
        
        // console.log("各单位准备！");//1
        tmripple.init()
    },
    methods:{},
}
</script>

<style scoped lang="scss">
.container {
	// position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	// height: 50px;
	// width: 200px;
	margin: auto;
}
*[data-animation="ripple"] {
	height: 100%;
	width: 100%;
	display: block;
	outline: none;
	padding: 20px;
	color: #fff;
	text-transform: uppercase;
	background: linear-gradient(135deg, #e570e7 0%,#79f1fc 100%);
	box-sizing: border-box;
	text-align: center;
	line-height: 14px;
	font-family: roboto, helvetica;
	font-weight: 200;
	letter-spacing: 1px;
	text-decoration: none;
	box-shadow: 0 5px 3px rgba(0, 0, 0, 0.3);
	cursor: pointer;
    /*border-radius: 50px;*/
	-webkit-tap-highlight-color: transparent;
	border-radius: 5px;
}

// :focus || CSS 伪类表示获得焦点的元素（如表单输入）。当用户点击或轻触一个元素或使用键盘的 Tab 键选择它时，它会被触发。
*[data-animation="ripple"]:focus {
	outline: none;
}

// ::selection || CSS 伪元素应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）。
*[data-animation="ripple"]::selection {
	background: transparent;
	pointer-events: none;
}
</style>