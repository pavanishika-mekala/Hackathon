/**
 *  @author     Parveen.Chahal
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};

kony.apps.coe.RedBlackTree = function(comparator) {
	var Node = function(k, v, c) {
		this.key = k;
		this.val = v;
		this.color = c;
		this.left = null;
		this.right = null;
	};
	this.root = null;
	this.RED = true;
	this.BLACK = false;
	this.comparatorMethod = null;
	
	if(comparator === null || comparator === undefined || typeof(comparator) !== "function") {
		this.comparatorMethod = function(a, b) {
			a = "" + String(a);
			b = "" + String(b);
			return a.localeCompare(b);
		};
	} else {
		this.comparatorMethod = comparator;
	}
	
  	function isRed(x) {
		if (x === null) {
			return false;
		}
		return x.color === this.RED;
	}
		
	kony.apps.coe.RedBlackTree.prototype.insert = function(k, v) {
      	if(k === null) {
            return;
        }
		this.root = insert.call(this, this.root, k, v);
		this.root.color = this.BLACK;
	};
		
	function insert(h, k, v) {
		if (h === null) {
			return new Node(k, [v], this.RED);
		}
		var cmp = this.comparatorMethod(k, h.key);
		if (cmp < 0) {
			h.left = insert.call(this, h.left, k, v);
		} else if (cmp > 0) {
			h.right = insert.call(this, h.right, k, v);
		} else {
			h.val.push(v);
		}
		if (isRed.call(this, h.right) && !isRed.call(this, h.left)) {
			h = rotateLeft.call(this, h);
		}
		if (isRed.call(this, h.left) && isRed.call(this, h.left.left)) {
			h = rotateRight.call(this, h);
		}
		if (isRed.call(this, h.left) && isRed.call(this, h.right)) {
			flipColors.call(this, h);
		}
		
		return h;
	}
		
	function rotateRight(h) {
		var x = h.left;
		h.left = x.right;
		x.right = h;
		x.color = x.right.color;
		x.right.color = this.RED;
		return x;
	}
	function rotateLeft(h) {
		var x = h.right;
		h.right = x.left;
		x.left = h;
		x.color = x.left.color;
		x.left.color = this.RED;
		return x;
	}
	
	function flipColors(h) {
		h.color = !h.color;
		h.left.color = !h.left.color;
		h.right.color = !h.right.color;
	}
	
	kony.apps.coe.RedBlackTree.prototype.preOrder = function() {
		preOrder.call(this, this.root);
	};
	
/*
	function preOrder(root) {
		if(root === null) {
			return;
		}
		alert("Key = " + root.key + " : Color = " + (root.color == this.RED ? "Red" : "Black") + " : LC = " + (root.left !== null ? root.left.key : "null") + " : RC = " + (root.right !== null ? root.right.key : "null"));
		preOrder.call(this, root.left);
		preOrder.call(this, root.right);
	}
*/
	
	kony.apps.coe.RedBlackTree.prototype.getAllKeys = function() {
		var arr = [];
		inOrder.call(this, this.root, arr);
		return arr;
	};

	function inOrder(root, arr) {
		if (root === null) {
			return;
		}
		inOrder.call(this, root.left, arr);
		arr.push(root.key);
		inOrder.call(this, root.right, arr);
	}
	
	kony.apps.coe.RedBlackTree.prototype.get = function(k) {
      	if(k === null) {
            return null;
        }
		return get.call(this, this.root, k);
	};
	
	function get(ptr, k) {
		if(ptr === null) {
			return null;
		}
		while(ptr !== null) {
			var cmp = this.comparatorMethod(k, ptr.key);
			if(cmp === 0) {
				return ptr.val;
			} else if (cmp < 0) {
				ptr = ptr.left;
			} else {
				ptr = ptr.right;
			}
		}
		return null;
	}	
};


kony.apps.coe.makeGroups = function(key, dataArray, comparator) {
    var tree = new kony.apps.coe.RedBlackTree(comparator);
    var i;
	for(i in dataArray) {
	    tree.insert(dataArray[i][key], dataArray[i]);
	}
	var allkeys = tree.getAllKeys();
	var groups = [];
	for(i in allkeys) {
	    groups.push(tree.get(allkeys[i]));
	}
	return groups;
};