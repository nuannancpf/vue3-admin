function myModule() {
      // 私有数据
      var msg = "my module"
      // 操作数据的行为
      function doSomething() {
            console.log('doSomething()' + msg.toUpperCase());
      }

      function doTherthing() {
            console.log('doTherthing()' + msg.toUpperCase());
      }
      return {
            doSomething,
            doTherthing
      }
}
