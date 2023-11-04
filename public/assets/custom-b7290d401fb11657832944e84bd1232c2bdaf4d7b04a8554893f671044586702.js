document.addEventListener("DOMContentLoaded", function() {
  const myLeaveBtn = document.getElementById("my-leave-btn");
  const newLeaveBtn = document.getElementById("new-leave-btn");
  const myAnnualLeaveBtn = document.getElementById("my-annual-leave-btn");
  const contentArea = document.getElementById("content-area");

  myLeaveBtn.addEventListener("click", function() {
    // 当点击“我的假期申请”按钮时，显示相应内容
    contentArea.innerHTML = "<p>这里显示“我的假期申请”的内容。</p>";
  });

  newLeaveBtn.addEventListener("click", function() {
    // 当点击“新建请假”按钮时，显示相应内容
    contentArea.innerHTML = "<p>这里显示“新建请假”的内容。</p>";
  });

  myAnnualLeaveBtn.addEventListener("click", function() {
    // 当点击“我的年假”按钮时，显示相应内容
    contentArea.innerHTML = "<p>这里显示“我的年假”的内容。</p>";
  });
});

