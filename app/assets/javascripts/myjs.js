document.addEventListener("DOMContentLoaded", function() {
  const myLeaveBtn = document.getElementById("my-leave-btn");
  const myAnnualLeaveBtn = document.getElementById("my-annual-leave-btn");
  const myApprovalBtn = document.getElementById("pending-me");
  const contentArea = document.getElementById("content-area");


// Create function to hanle the button "my leave requests"
myLeaveBtn.addEventListener("click", () => {
    // 发送请求获取与当前用户相关的假期列表数据
    fetch("/leaves/fetch")
      .then(response => response.json())
      .then(data => {
        // 生成表格
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>假期类型</th>
              <th>开始日期</th>
              <th>结束日期</th>
              <th>审批状态</th>
              <th>请假人</th>		     
            </tr>
          </thead>
          <tbody>
            ${data.map((leave, index)=> `
              <tr style="background-color: ${index % 2 === 0 ? 'lightblue' : 'white'};"
 >
                <td>${leave.leave_type}</td>
                <td>${leave.start_date}</td>
                <td>${leave.end_date}</td>
                <td>${leave.approve_status}</td>
		<td>${leave.requestor}</td>
              </tr>
            `).join("")}
          </tbody>
        `;

        // 清空显示区域并添加表格
        contentArea.innerHTML = "";
        contentArea.appendChild(table);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });


// Create a function to fetch remaining leaves
// 创建一个获取剩余请假天数的函数
myAnnualLeaveBtn.addEventListener("click", () => {
  fetch("/users/fetch_balance")
    .then(response => response.json())
    .then(data => {
      // 检查data是否为对象
      if (typeof data === "object" && data.remaining_leave !== undefined) {
        // 生成一个表格
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>年假剩余天数</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: lightblue;">
              <td style="text-align: center;">${data.remaining_leave}</td>
            </tr>
          </tbody>
        `;

        // replace contentArea with the table
        contentArea.innerHTML = "";
        contentArea.appendChild(table);
      } else {
        console.error("错误：无效的数据格式");
      }
    })
    .catch(error => {
      console.error("错误：", error);
    });
});

myApprovalBtn.addEventListener("click", () => {
    // 发送请求获取与当前用户相关的假期列表数据
    fetch("/leaves/fetch_toapprove")
      .then(response => response.json())
      .then(data => { 
      // display via pages
        const pageSize = 15;
        const totalPages = Math.ceil(data.length / pageSize);
        let currentPage = 1;
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let currentData = data.slice(startIndex, endIndex);
        // Generate table
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>假期类型</th>
              <th>开始日期</th>
              <th>结束日期</th>
              <th>请假事由</th>
              <th>请假人</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((leave, index)=> `
              <tr style="background-color: ${index % 2 === 0 ? 'lightblue' : 'white'};"
 >
                <td>${leave.leave_type}</td>
                <td>${leave.start_date}</td>
                <td>${leave.end_date}</td>
                <td>${leave.reason}</td>
                <td>${leave.requestor}</td>
              </tr>
            `).join("")}
          </tbody>
        `;

        // 清空显示区域并添加表格
        contentArea.innerHTML = "";
        contentArea.appendChild(table);
      
// Display window via modal.......
	// Show the page details in a modal
const showModal = (leave) => {
  // Create a modal element
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("role", "dialog");

  // Create the modal dialog
  const dialog = document.createElement("div");
  dialog.classList.add("modal-dialog");
  dialog.setAttribute("role", "document");

  // Create the modal content
  const content = document.createElement("div");
  content.classList.add("modal-content");

  // Create the modal header
  const header = document.createElement("div");
  header.classList.add("modal-header");

  // Create the close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("close");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("data-dismiss", "modal");
  closeButton.innerHTML = "&times;";

  // create the confirm button and reject button
  const rejectButton = document.createElement("button");
  rejectButton.classList.add("cancel");
  rejectButton.setAttribute("id","leaveCancel")
  rejectButton.innerText = "拒绝";
  closeButton.setAttribute("type","button");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirm");
  confirmButton.innerText = "批准";
  confirmButton.setAttribute("id","leaveApproval");
  closeButton.setAttribute("type","button");

  // Create the modal title
  const title = document.createElement("h5");
  title.classList.add("modal-title");
  title.innerText = "请假详情";

  // Append the close button and title to the header
  header.appendChild(closeButton);
  header.appendChild(title);

  // Create the modal body
  const body = document.createElement("div");
  body.classList.add("modal-body");

  // create the footer
  const footer = document.createElement("div")
  footer.appendChild(confirmButton);
  footer.appendChild(rejectButton);
  footer.classList.add("modal-footer");

  // Create the vacation details
  const leaveType = document.createElement("p");
  leaveType.innerText = `请假类型: ${leave.leave_type}`;

  const startDate = document.createElement("p");
  startDate.innerText = `开始时间: ${leave.start_date}`;

  const endDate = document.createElement("p");
  endDate.innerText = `结束时间: ${leave.end_date}`;

  const reason = document.createElement("p");
  reason.innerText = `请假理由: ${leave.reason}`;

  const requestor = document.createElement("p");
  requestor.innerText = `请假人: ${leave.requestor}`;

  // Append the vacation details to the body
  body.appendChild(leaveType);
  body.appendChild(startDate);
  body.appendChild(endDate);
  body.appendChild(reason);
  body.appendChild(requestor);

  // Append the header and body to the content
  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(footer)
  // Append the content to the dialog
  dialog.appendChild(content);

  // Append the dialog to the modal
  modal.appendChild(dialog);
  // binding click event
  $(confirmButton).on('click',function(e){
    approveLeave(leave.id)
    $(modal).find('.close').click();
  })
   $(rejectButton).on('click',function(e){
    rejectLeave(leave.id)
    $(modal).find('.close').click();
  })
  // Add the modal to the document body
  document.body.appendChild(modal),$(modal).modal("show");
};



      // 添加点击事件处理程序到每一行记录
      const rows = table.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener("click", () => {
          // 获取该行记录的数据
          const leave = currentData[i - 1];

          // 弹出窗口显示页面详情
          // Show the page details in a modal....
           showModal(leave);
		
	});
      }      

      })
      .catch(error => {
        console.error("Error:", error);
      });
  });

function approveLeave(leaveId) {
  // Call API to update approve_status to be "已批准"
  fetch(`/leaves/approve/${leaveId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ approve_status: "已批准" })
  })
    .then(response => {
     if (response.ok) {
      myApprovalBtn.click();
      } else {
        alert("更新失败，请重试！");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function rejectLeave(leaveId) {
  // Call API to update approve_status to be "已拒绝"
  fetch(`/leaves/reject/${leaveId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ approve_status: "已拒绝" })
  })
    .then(response => {
      if (response.ok) {
        myApprovalBtn.click();
      } else {
       alert("更新失败，请重试！");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

})
