if ($.browser.msie && jQuery.browser.version < 7.0) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
	}
}

/**
 * TreeView 配置参数
 * 
 * @type Object
 */
var TreeOption = function() {

};

/**
 * TreeView 配置参数
 * 
 * @type Object
 */
TreeOption.prototype = {
	/**
	 * 树容器对象
	 * 
	 * @type String|Jquery Object|HtmlElement
	 */
	container : '',
	/**
	 * 
	 * @type String
	 */
	root : '',
	/**
	 * 载入URL
	 * 
	 * @type String
	 */
	url : 'tree_data.jsp',
	/**
	 * 树打开与关闭事件类型，默认为单击事件
	 * 
	 * @type String
	 */
	event : 'dblclick',
	/**
	 * 事件动作
	 * 
	 * 
	 */
	action : function() {

	},
	/**
	 * 树打开速度
	 * 
	 * @type Number
	 */
	expandSpeed : 140,
	/**
	 * 树关闭速度
	 * 
	 * @type Number
	 */
	collapseSpeed : 140,
	/**
	 * 树打开效果
	 * 
	 * @type String
	 */
	expandEasing : 'easeOutBounce',
	/**
	 * 树关闭效果
	 * 
	 * @type String
	 */
	collapseEasing : 'easeOutBounce',
	/**
	 * 
	 * @type Boolean
	 */
	multiFolder : true,
	/**
	 * 是否可以多选择
	 * 
	 * @type Boolean
	 */
	isMultiSelected : false,
	/**
	 * 正在载入文本信息
	 * 
	 * @type String
	 */
	loadMessage : 'Loading...',
	/**
	 * 对象名称，例如：var tree=new TreeView(); 则该值为：tree
	 * 
	 * @type String
	 */
	funName : 'tree',
	/**
	 * 是否有复选框
	 * 
	 * @type Boolean
	 */
	isCheckBox : false,
	/**
	 * 如果绘制复选框，则定义复选框全局名称，注意不是ID，对应html input name值
	 * 
	 * @type String
	 */
	checkBoxName : "benma_ch_9008"

};

/**
 * 树对象
 * 
 * <pre>
 * var tree = null;
 * $(function() {
 * 			tree = new TreeView({
 * 						container : 'demo1',
 * 						root : '/',
 * 						url : 'tree2.jsp',
 * 						expandSpeed : 500,
 * 						collapseSpeed : 500,
 * 						expandEasing : 'easeOutBounce',
 * 						collapseEasing : 'easeOutBounce',
 * 						loadMessage : '正在载入...',
 * 						multiFolder : true,
 * 						funName : &quot;tree&quot;,
 * 						action : function(el) {
 * 							//alert(el);
 * 						}
 * 					});
 * 
 * 		});
 * </pre>
 * 
 * @param {Object|TreeOption}
 *            option TreeOption Object
 */
var TreeView = function(option) {
	var o = new TreeOption();
	var root = null;

	jQuery.extend(o, option);
	if (o.container == undefined) {
		o.container = "beanma_treeview_9008";
		$(document).append("<div id=\"" + o.container + "\"></div>");
	};

	root = $(document.getElementById(o.container));
	// document.getElementById(o.container).onselect=document.selection.empty();
	// Loading message
	root.html('<ul class="benma_tree start"><li class="wait">' + o.loadMessage
			+ '<li></ul>');
	var currSelectNode = null;

	/**
	 * 当前被选择节点
	 * 
	 * @type Jquery Object
	 */
	var currentNode = root;

	// Get the initial file list
	loadTree(root, true);

	// debugger;

	/**
	 * 展开节点
	 * 
	 * @param {}
	 *            el
	 */
	this.expand = function(el) {
		this.toggle(el);
	};
	this.toggle = function(el) {
		if (el) {
			toggleNode(el, 0);
		} else {
			toggleNode(this.currSelectNode.parent(), 0);
		}

	}, /**
		 * 收缩节点
		 * 
		 * @param {}
		 *            el el=ALL--
		 */
	this.collapse = function(el) {
		this.toggle(el);
	};
	// event
	/**
	 * 重新载入整棵树
	 * 
	 * 
	 */
	this.reload = function() {
		loadTree(root, true);
	};
	/**
	 * 重新载入
	 * 
	 * @param {}
	 *            el el==null 重新载入整棵树
	 */
	this.reloadCurrentNode = function(el) {
		toggleNode(this.currSelectNode.parent(), 0, true);
		if (this.currSelectNode) {
			toggleNode(this.currSelectNode.parent(), 1, true);
		} else {
			this.reload();
		}
	};

	/**
	 * 得到同级别或层次相邻的下一个姊妹节点
	 * 
	 * @return {Jquery Object}
	 */
	this.getNextSibling = function() {
		return currentNode.prev();
	};

	/**
	 * 得到同级别或层次相邻的上一个姊妹节点
	 * 
	 * @return {Jquery Object}
	 */
	this.getPreviousSibling = function() {
		return currentNode.next();
	};
	/**
	 * 得到当前节点的父节点
	 * 
	 * @param {}
	 *            el
	 * @param {}
	 *            el
	 * @return {}
	 */
	this.getParent = function(el) {
		return currSelectNode.parent().parent().parent();
	};

	/**
	 * 获取选择的节点
	 * 
	 * @return {Jquery Object}
	 */
	this.getSelected = function() {
		return currSelectNode;
	};
	this.openTheNode = function(c, flag) {
		toggleNode($(c).parent().parent(), flag, true);
	};
	this.mouseover = function(e) {
		$(e).addClass("hover");
	};
	this.mouseout = function(e) {
		$(e).removeClass("hover");
	};
	this.action = function(e) {
		o.action(e, this.getRef($(e).parent().parent()));
	};
	/**
	 * 获取参考
	 */
	this.getRef = function(el) {
		if (el) {
			return escape($(el).attr('ref'));
		} else {
			return escape(this.currSelectNode.parent().attr('ref'));
		}

	};
	this.selected = function(e) {
		if (this.currSelectNode) {
			this.currSelectNode.removeClass("selected");
		}
		this.currSelectNode = $(e).parent();
		this.currSelectNode.addClass("selected");
		this.action(e);
	};
	/* 一下为私有函数 */

	/**
	 * c 当前节点 li element
	 */
	function toggleNode(c, flag, load) {
		if ($(c).hasClass("directory")) {
			if ($(c).hasClass('collapsed') || load) {
				if ($(c).find('ul').size() == 0 || flag == 1) {
					loadTree(c, false, function(c) {
								showChildNode(c);
							});
				} else {
					showChildNode(c);
				}
			} else {
				$($(c).find('ul').get(0)).hide();
				$(c).removeClass('expanded').addClass('collapsed');
				$($(c).find("span").get(1)).removeClass('openfolder')
						.addClass('folder');
				var plus = $($(c).find(".beanma_plus").get(0));
				if (plus.hasClass("Lminus")) {
					plus.removeClass("Lminus").addClass("Lplus");//
				} else {
					plus.removeClass("Tminus").addClass("Tplus");//
				}

			}
		}
	}

	function showChildNode(c) {
		$($(c).find('ul').get(0)).show();
		// $($(c).find('ul').get(0)).slideDown({
		// duration : o.expandSpeed,
		// easing : o.expandEasing
		// });
		$(c).removeClass('collapsed').addClass('expanded');
		$($(c).find("span").get(1)).removeClass('folder')
				.addClass('openfolder');
		var plus = $($(c).find(".beanma_plus").get(0));
		if (plus.hasClass("Lplus")) {
			plus.addClass("Lminus").removeClass("Lplus");
		} else {
			plus.addClass("Tminus").removeClass("Tplus");
		}
		if (!o.multiFolder && currSelectNode != null) {
			alert(currSelectNode);
			$(currSelectNode.parent().find('ul').get(0)).hide();
		}
	}
	/**
	 * 载入tree内容
	 * 
	 * @param {}
	 *            c 当前节点 li element
	 */
	function loadTree(c, isRoot, callback) {
		$($(c).find("span").get(1)).addClass('wait');
		var isLast = $(c).attr("last") == 1 ? "1" : "0";
		var id = "";
		var level = 0;
		if (isRoot) {
			id = escape(o.root);
			level = 0;
		} else {
			 id = escape($(c).attr('ref'));
			//id = escape($($(c).find("div").get(0)).attr('ref'));
			level = $(c).attr('level');
		}
		$.ajax({
			type : "POST",
			url : o.url,
			data : {
				benma_tree_id : id,
				benma_tree_level : level,
				benma_tree_date : new Date(),
				benma_tree_isLast : isLast,
				benma_tree_fun : o.funName,
				benma_tree_check : o.isCheckBox,
				benma_tree_chbxName : o.checkBoxName,
				benma_tree_event : o.event == "dblclick"
						? "ondblclick"
						: "onclick"
			},
			error : function() {
				$($(c).find("span").get(1)).removeClass("wait").addClass("err");
			},
			dataType : "html",
			success : function(data) {
				$(c).find('ul').remove();
				if ($.trim(data) == "") {
					$($(c).find("span").get(1)).removeClass("wait")
							.removeClass("folder").addClass("file");
					if ($($(c).find(".beanma_plus").get(0)).attr("class")
							.indexOf("Lminus") !== -1) {
					}

					// $($(c).find(".beanma_plus").get(0)).addClass("Lminus").removeClass("Lplus");
					var plus = $($(c).find(".beanma_plus").get(0));
					if (plus.hasClass("Lplus")) {
						plus.addClass("Lminus").removeClass("Lplus");
					} else {
						plus.addClass("Tminus").removeClass("Tplus");
					}
				} else {
					if ($($(c).find("span").get(1)).hasClass("file")) {
						$($(c).find("span").get(1)).removeClass("file")
					}
					$(c).append(data);
					if (o.root == id) {
						$(c).find('UL:hidden').show();
					} else {
						$(c).find('UL:hidden').show();
					}
					if (callback) {
						callback(c);
					}
					$($(c).find("span").get(1)).removeClass("wait");
				}
			}
		});

	}
}
