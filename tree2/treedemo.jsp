<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Insert title here</title>
<style type="text/css">
.example {
	float: left;
	margin: 10px;
}

.demo {
	width: 600px;
	height: 400px;
	border-top: solid 1px #BBB;
	border-left: solid 1px #BBB;
	border-bottom: solid 1px #FFF;
	border-right: solid 1px #FFF;
	background: #FFF;
	overflow: scroll;
	padding: 5px;
}

h2 {
	font-size: 16px;
	font-family: "宋体";
}
</style>
<script src="../jquery.js" type="text/javascript"></script>
<script src="../jquery.easing.1.3.js" type="text/javascript"></script>
<script src="../benma_utils.js" type="text/javascript"></script>
<script src="treeview.js" type="text/javascript"></script>
<link href="tree.css" rel="stylesheet" type="text/css" media="screen" />
<script type="text/javascript">
	var tree = null;
	$( function() {
		tree = new TreeView( {
			container : 'demo1',
			root : '/',
			url : 'tree2.jsp',
			expandSpeed : 500,
			collapseSpeed : 500,
			expandEasing : 'easeOutBounce',
			collapseEasing : 'easeOutBounce',
			loadMessage : '正在载入...',
			multiFolder : false,
			funName : "tree",
			isCheckBox : true,
			action : function(el) {
				//alert(el.innerHTML);
		}
		});
	});
	function rr1() {
		tree.reload();
	}
	function rr2() {
		tree.reloadCurrentNode();
	}
	function toggle() {
		tree.toggle();
	}
</script>
</head>
<body>
<div id="demo1" class="demo"></div>
<button onclick="rr1()">载入树</button>
<button onclick="rr2()">载入节点</button>
<button onclick="toggle()">toggle</button>
</body>
</html>
