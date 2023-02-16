let Transformer = class Transformer {

    constructor(context) {
        this.x = 0;
        this.y = 0;
        this.a = 0;
        this.s = 1;
        this.group_push = 0;
        this.stack = [];
        this.commands = [];
        this.context = context;
    }

    push() {
        if (this.context) {
            this.context.push();
        } else {
            push();
        }
        this.group_push++;
        return this.stack.push([this.x, this.y, this.a, this.s]);
    }

    pop() {
        if (this.context) {
            this.context.pop();
        } else {
            pop();
        }
        while (this.commands.length > 0 && this.commands[this.commands.length - 1].group_push == this.group_push) {
            this.commands.pop()
        }
        this.group_push--;
        return [this.x, this.y, this.a, this.s] = this.stack.pop();
    }

    rotate(da) {
        if (this.context) {
            this.context.rotate(da);
        } else {
            rotate(da);
        }
        this.commands.push({
            group_push: this.group_push,
            code: `r ${da}`
        });
        return this.a += da;
    }

    scale(ds) {
        if (this.context) {
            this.context.scale(ds);
        } else {
            scale(ds);
        }
        this.commands.push({
            group_push: this.group_push,
            code: `s ${ds}`
        });
        return this.s *= ds;
    }

    translate(dx, dy) {
        if (this.context) {
            this.context.translate(dx, dy);
        } else {
            translate(dx, dy);
        }
        this.commands.push({
            group_push: this.group_push,
            code: `t ${dx} ${dy}`
        });
        this.x += this.s * dx * cos(this.a) - this.s * dy * sin(this.a);
        return this.y += this.s * dy * cos(this.a) + this.s * dx * sin(this.a);
    }

    getCommands() {
        return this.commands.slice();
    }

    applyTransformInverse(x, y) {
        let commands = this.getCommands()
        var a, arr, command, dx, dy, k, len, ref, x1, y1;
        ref = commands.reverse();
        for (k = 0, len = ref.length; k < len; k++) {
            command = ref[k];
            arr = command.code.split(' ');
            if (arr[0] === 'r') {
                a = parseFloat(arr[1]);
                x1 = x * cos(a) - y * sin(a);
                y1 = y * cos(a) + x * sin(a);
                [x, y] = [x1, y1];
            }
            if (arr[0] === 's') {
                x = x * parseFloat(arr[1]);
                y = y * parseFloat(arr[1]);
            }
            if (arr[0] === 't') {
                dx = parseFloat(arr[1]);
                dy = parseFloat(arr[2]);
                x += dx;
                y += dy;
            }
        }
        return {x, y};
    }

    restore(x, y) {
        let commands = this.getCommands()
        var arr, command, k, len, ref;
        ref = commands.reverse();
        for (k = 0, len = ref.length; k < len; k++) {
            command = ref[k];
            arr = command.code.split(' ');
            if (arr[0] === 'r') {
                let a = -parseFloat(arr[1]);
                this.rotate(a)
            }
            if (arr[0] === 's') {
                let s = 1 / parseFloat(arr[1])
                this.scale(s)
            }
            if (arr[0] === 't') {
                let dx = -parseFloat(arr[1]);
                let dy = -parseFloat(arr[2]);
                this.translate(dx, dy)
            }
        }
    }
}