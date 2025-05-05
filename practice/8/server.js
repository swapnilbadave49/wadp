const tasks=JSON.parse(localStorage.getItem("tasks"))||[];
function savetask()
{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function rendertask()
{
    const row=document.getElementById("list");
    row.innerHTML="";
    tasks.forEach((task,index) => {
        const list=document.createElement("li");
        list.innerHTML=`
         <span class="task-text">${task.text}</span>
         <button onclick="edittask(${index})">Edit</button>
         <button onclick="deletetask(${index})">Delete</button>
        `;
         row.appendChild(list);
    });

}
function addtask()
{
    const ipdata=document.getElementById("iptext");
    const iptask=ipdata.value.trim();
    if(!iptask)return alert("Task cannot be empty")

     const xhr=new XMLHttpRequest();
     xhr.open("POST","/add",true);
     xhr.setRequestHeader("content-type","application/json");
     
     xhr.onreadystatechange=function()
     {
        if(xhr.readyState===4)
            {
                const data={text:iptask};
                tasks.push(data);
                savetask();
                rendertask();  
                input.value = "";   
            }
     }

     xhr.send(JSON.stringify({text:ipdata}));
}


function edittask(index)
{
    const ndata=prompt("Updated Task: ",tasks[index].text);
    if(ndata===null || ndata.trim()==="")return;

    const xhr=new XMLHttpRequest();
    xhr.open("PUT","/edit-task",true);
    xhr.setRequestHeader("content-type","application/json"); 
    xhr.onreadystatechange=function()
    {  if(xhr.readyState===4)
        {tasks[index].text=ndata.trim();
        savetask();
        rendertask();
        }   
    }
    xhr.send(JSON.stringify({index:index,task:ndata.trim()}));
    
}
function deletetask(index)
{
    const xhr=new XMLHttpRequest;
    xhr.open("DELETE","/del-task",true);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState===4)
            {
                tasks.splice(index,1);
                savetask();
                rendertask();
            }
    }
    xhr.send(JSON.stringify({index}));
}

rendertask();