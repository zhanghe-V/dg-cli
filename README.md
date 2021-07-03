## 脚手架本地link标准流程

### 链接本地脚手架
```cmd
cd test-cli
npm link
```

### 链接本地库文件
```cmd
cd test-cli-lib
npm link
cd test-cli
npm link test-cli-lib
```

### 取消链接本地库文件
```cmd
cd test-cli-lib
npm unlink
cd test-cli
# link 存在
npm unlink test-cli-lib
# link 不存在
rimraf node_modules
```

### 理解`npm link`
- npm link 将当前项目连接到node全局node_modules中作为一个库文件，并解析bin配置创建可执行文件
- npm link test-cli-lib 将当前项目中node_modules下指定的库文件连接到node全局node_modules下的库文件

### 理解`npm unlink`
- npm unlink 将当前项目从node全局node_modules中移除
- npm unlink test-cli-lib 将当前项目中库文件依赖移除