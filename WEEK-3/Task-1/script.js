$(document).ready(function () {
    $("#addTaskButton").on("click", function () {
        const taskInput = $("#taskInput").val();
        const taskList = $(".task-list");

        if (taskInput.trim() !== "") {
            const taskItem = $(`
                <li>
                    <span>${taskInput}</span>
                    <button id="deleteTaskButton">Delete</button>
                </li>`
            );

            taskList.append(taskItem);
            $("#taskInput").val("");
        }
    });

    $(document).on("click", "LI", function (e) {
        if (e.target.id === "deleteTaskButton") {
            $(this).remove();
        } else if (e.target.tagName === "LI") {
            $(this).toggleClass("completed");
        }
    });
});