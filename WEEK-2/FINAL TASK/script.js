const modal = document.getElementsByClassName("modal")[0];
const createButton = document.getElementById("createButton");
const addButton = document.getElementById("addButton");
const cancelButton = document.getElementById("cancelButton");
const taskForm = document.getElementsByClassName("task-form")[0];
const taskCardList = document.getElementsByClassName("task-card-list")[0];
const sortByPriority = document.getElementById("sortByPriority");
const showComplated = document.getElementById("showComplated");

let defaultOrder = [];
let isSorted = false;

const closeModal = () => {
    modal.close();
    taskForm.reset();
}

const addTask = (taskFormData) => {
    try {
        // FORM DATA DESTRUCTURING

        const { title, desc, priority } = taskFormData;

        // INPUT VALIDATION

        if (!title || title.trim() <= 0) {
            throw new Error("Task name cannot be empty");
        }

        if (!priority) {
            throw new Error("Task priority cannot be empty");
        }

        // CREATE ELEMENTS

        const taskCardContainer = document.createElement("li");
        taskCardContainer.classList.add("task-card-container");

        if (priority === "Low") {
            taskCardContainer.classList.add("task-card-priority-low");
        } else if (priority === "High") {
            taskCardContainer.classList.add("task-card-priority-high");
        } 

        const taskCard = document.createElement("article");
        taskCard.classList.add("task-card");

        const taskCardTitle = document.createElement("h3");
        taskCardTitle.classList.add("task-card-title");
        taskCardTitle.textContent = title;

        const taskCardDesc = document.createElement("p");
        taskCardDesc.classList.add("task-card-desc");
        taskCardDesc.textContent = desc || "No description";

        const taskCardPriority = document.createElement("p");
        taskCardPriority.classList.add("task-card-priority");
        taskCardPriority.textContent = `Priority: ${priority}`;

        const taskCardStatus = document.createElement("div");
        taskCardStatus.classList.add("task-card-status");

        const taskCardStatusLabel = document.createElement("label");
        taskCardStatusLabel.setAttribute("for", "taskIsComplete");
        taskCardStatusLabel.textContent = "Status";

        const taskCardStatusInput = document.createElement("input");
        taskCardStatusInput.setAttribute("type", "checkbox");
        taskCardStatusInput.setAttribute("id", "taskIsComplete");
        taskCardStatusInput.setAttribute("name", "taskIsComplete");
        taskCardStatusInput.setAttribute("default", "false");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "X";

        // EVENT LISTENERS

        taskCardContainer.addEventListener("mouseover", () => {
            deleteButton.style.display = "block";
        });
        taskCardContainer.addEventListener("mouseout", () => {
            deleteButton.style.display = "none";
        });

        taskCardStatusInput.addEventListener("change", (e) => {
            if (e.target.checked) {
                taskCardContainer.classList.add("task-complated")
            } else {
                taskCardContainer.classList.remove("task-complated")
            }
        });

        deleteButton.addEventListener("click", () => {
            taskCardContainer.remove();
        });

        // APPEND ELEMENTS

        taskCardStatus.append(
            taskCardStatusLabel,
            taskCardStatusInput
        );

        taskCard.append(
            taskCardTitle,
            taskCardDesc,
            taskCardPriority,
            taskCardStatus,
            deleteButton
        );

        taskCardContainer.append(
            taskCard,
        );

        taskCardList.append(
            taskCardContainer
        );

        defaultOrder.push(taskCardContainer);

        closeModal();
    } catch (error) {
        alert(error.message);
    }
}

const getFormData = () => {
    const formData = new FormData(taskForm);

    return {
        title: formData.get("taskName"),
        desc: formData.get("taskDesc"),
        priority: formData.get("taskPriority")
    };
};

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskFormData = getFormData();

    addTask(taskFormData);
});

createButton.addEventListener("click", () => {
    modal.showModal();
});

cancelButton.addEventListener("click", () => {
    closeModal();
});

modal.addEventListener("click", () => {
    closeModal();
});

modal.children[0].addEventListener("click", (e) => {
    e.stopPropagation();
});

showComplated.addEventListener("click", () => {
    const taskCardContainer = document.querySelectorAll(".task-card-container");

    taskCardContainer.forEach((container) => {
        if (!container.classList.contains("task-complated")) {
            container.classList.toggle("hidden");
        } 
    });
});

sortByPriority.addEventListener("click", () => {
    const taskCardContainers = document.querySelectorAll(".task-card-container");
    const priorities = {
        Low: 1,
        Normal: 2,
        High: 3
    };
    let sortedTaskCardList = [];

    if (!isSorted) {
        sortedTaskCardList = Array.from(taskCardContainers).sort((a, b) => {
            const priorityA = a.children[0].children[2].textContent.split(": ")[1];
            const priorityB = b.children[0].children[2].textContent.split(": ")[1];
    
            return priorities[priorityA] - priorities[priorityB];
        })

        isSorted = true;
    } else if (isSorted) {
        sortedTaskCardList = defaultOrder;

        isSorted = false;
    }
    

    taskCardList.replaceChildren(...sortedTaskCardList);
});