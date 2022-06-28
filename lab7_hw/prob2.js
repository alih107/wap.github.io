let group = {
    title: 'Our group',
    students: ["Alikhan", "David", "Yousef", "Laith"],
    showList: function() {
        this.students.forEach((st) => {
            console.log(this.title + ": " + st);
        })
    }
};

group.showList();