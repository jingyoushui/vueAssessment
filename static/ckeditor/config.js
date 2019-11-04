/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language =

	config.uiColor = '#AADC6E';
  config.toolbarCanCollapse = true;
  config.dialog_backgroundCoverColor = "#545c64"; //可设置参考
  config.height = 350;
  config.removePlugins = 'elementspath,'; // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮
  config.allowedContent = false; // 是否允许使用源码模式进行编辑

  // 图片上传相关
 config.filebrowserImageUploadUrl = './upload'; // 图片上传路径
 config.image_previewText = ' '; // 图片信息面板预览区内容的文字内容，默认显示CKEditor自带的内容
 config.removeDialogTabs = 'image:advanced;image:Link'; // 移除图片上传页面的'高级','链接'页签
 config.pasteUploadFileApi = "./upload"

};
