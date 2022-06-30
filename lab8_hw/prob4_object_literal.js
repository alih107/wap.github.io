let ll = {
    val: undefined,
    next: null,
    add(el) {
        if (this.val === undefined) {
            this.val = el;
        } else {
            let cur = this;
            while (cur.next) {
                cur = cur.next;
            }
            let l = Object.create(ll)
            l.next = null;
            l.val = el;
            cur.next = l;
        }
    },
    print() {
        let res = 'LinkedList{'
        let cur = this;
        while (cur) {
            res += `${cur.val},`
            cur = cur.next;
        }
        res = res.slice(0, -1) + '}';
        console.log(res);
    },

    remove(el) {
        let cur = this;
        let prev = null;
        while (cur) {
            if (cur.val === el) {
                if (prev === null) {
                    this.val = cur.next.val;
                    this.next = cur.next.next;
                } else {
                    prev.next = cur.next;
                }
            }
            prev = cur;
            cur = cur.next;
        }
    }
}

ll.add(1);
ll.add(2);
ll.add(3);
ll.print();
ll.remove(2);
ll.print();