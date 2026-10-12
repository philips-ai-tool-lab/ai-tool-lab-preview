# 在 Agent Builder 中添加 SharePoint 资料

SharePoint 分享或转发链接可能带有额外跳转信息，直接粘贴到 Agent Builder 时可能无法解析。

## 添加整个文档库

1. 打开 SharePoint 文档库。
2. 在地址栏中找到 `/Forms/`。
3. 从 `/Forms/` 开始删除右侧全部内容。
4. 将剩余地址粘贴到 Agent Builder。

## 添加当前文件夹

1. 使用公司账号进入目标文件夹并确认可以读取文件。
2. 复制地址栏中的完整地址。
3. 保留 `id=` 等参数，不要删除内容或加入换行、空格。
4. 将完整地址粘贴到 Agent Builder。

## 确认添加成功

- Knowledge 区域显示目标来源名称。
- 页面没有红色错误提示。
- 点击 **Update** 后，用文件中的具体问题测试检索结果。

如果仍出现红色错误，改用 **My SharePoint files, folders, and sites** 文件选择器添加目标文件夹。
