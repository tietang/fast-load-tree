<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="commons.utils.string.CharTools"%><%@ page
	import="java.io.File,java.io.FilenameFilter,java.util.Arrays"%>
<%
	/**
	 * jQuery File Tree JSP Connector
	 * Version 1.0
	 * Copyright 2008 Joshua Gould
	 * 21 April 2008
	 */
	//Thread.sleep(1000);
	String dir = request.getParameter("benma_tree_id");
	String level1 = request.getParameter("benma_tree_level");
	String last = request.getParameter("benma_tree_isLast");
	String fun = request.getParameter("benma_tree_fun");
	String check = request.getParameter("benma_tree_check");
	String chbxName = request.getParameter("benma_tree_chbxName");
	if (dir == null) {
		return;
	}
	if (level1 == null) {
		return;
	}
	int level = Integer.parseInt(level1);
	level++;
	dir = CharTools.unescape(dir);
	if (dir.charAt(dir.length() - 1) == '\\') {
		dir = dir.substring(0, dir.length() - 1) + "/";
	} else if (dir.charAt(dir.length() - 1) != '/') {
		dir += "/";
	}
	if (new File(dir).exists()) {
		String[] files = new File(dir).list(new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.charAt(0) != '.';
			}
		});
		Arrays.sort(files, String.CASE_INSENSITIVE_ORDER);
		out.print("<ul class=\"benma_tree\" style=\"display: none;\">");
		// All dirs
		int i1 = 0;
		String s01 = "<img src=\"xp/T.gif\"/>";
		String s02 = "<img src=\"xp/L.gif\"/>";
		String s1 = "";
		String s2 = "";
		String f01 = "<img class=\"beanma_plus t\"  src=\"xp/Tplus.gif\"/>";
		String f02 = "<img  class=\"beanma_plus l\" src=\"xp/Lplus.gif\"/>";
		String f1 = "";
		String f2 = "";

		for (int j = 0; j < level; j++) {
			if (j == 0) {
				s1 += "<img src=\"xp/I.gif\"  border=\"0\"/>";
				s2 += "<img src=\"xp/I.gif\"/>";
				f1 += "<img src=\"xp/I.gif\"/>";
				f2 += "<img src=\"xp/I.gif\"/>";
			} else if (j == (level - 1)) {
				s1 += "<img src=\"xp/T.gif\"/>";
				s2 += "<img src=\"xp/L.gif\"/>";
				f1 += "<img class=\"beanma_plus t\" src=\"xp/Tplus.gif\"/>";
				f2 += "<img class=\"beanma_plus l\" src=\"xp/Lplus.gif\"/>";
			} else {
				s1 += "<img src=\"xp/I.gif\"/>";
				s2 += "<img src=\"xp/I.gif\"/>";
				f1 += "<img src=\"xp/I.gif\"/>";
				f2 += "<img src=\"xp/I.gif\"/>";
			}
		}

		for (String file : files) {
			if (new File(dir, file).isDirectory()) {
				out.print("<li class=\"directory collapsed\"   level=\"" +  level   + "\" rel=\"" + dir + file + "/\" >");
				out.print("<div  level=\"" +  level   + "\" rel=\"" + dir + file + "/\">");
				if (level == 1) {
					if (i1 == (files.length - 1)) {
						out.print(f02);
					} else {
						out.print(f01);
					}
				} else {
					if (i1 == (files.length - 1)) {
						out.print(f2);
					} else {
						out.print(f1);
					}
				}
		 				out.print("<span class=\"folder\">" + file + "</span></div></li>");

			}

			if (!new File(dir, file).isDirectory()) {
				int dotIndex = file.lastIndexOf('.');
				String ext = dotIndex > 0 ? file.substring(dotIndex + 1) : "";

				out.print("<li > ");
				out.print("<div   level=\"" +  level   + "\"  rel=\"" + dir + file + "/\">");
				if (level == 1) {
					if (i1 == (files.length - 1)) {
						out.print(s02);
					} else {
						out.print(s01);
					}
				} else {
					if (i1 == (files.length - 1)) {
						out.print(s2);
					} else {
						out.print(s1);
					}
				}
	 
				out.print("<span class=\"file\">" + file + "</span></div></li>");
			}
			i1++;
		}
		out.print("</ul>");
	}
%>