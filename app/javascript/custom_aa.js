document.addEventListener("DOMContentLoaded", function() {
  const myLeaveBtn = document.getElementById("my-leave-btn");
  const myAnnualLeaveBtn = document.getElementById("my-annual-leave-btn");
  const contentArea = document.getElementById("content-area");
  const openModalButton = document.getElementById("open-leave-modal");

  myLeaveBtn.addEventListener("click", function() {
    // 当点击“我的假期申请”按钮时，显示相应内容
    contentArea.innerHTML = "<p>这里显示“我的假期申请”的内容。</p>";
  });


   openModalButton.addEventListener("click", function () {
    // 使用 Bootstrap 提供的方法显示模态框
    $('#new-leave-modal').modal('show');
  });

  myAnnualLeaveBtn.addEventListener("click", function() {
    // 当点击“我的年假”按钮时，显示相应内容
    contentArea.innerHTML = "<p>这里显示“我的年假”的内容。</p>";
  });
});

