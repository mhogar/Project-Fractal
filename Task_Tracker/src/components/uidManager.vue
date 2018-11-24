<script>

let uid = 0;

export default {
	beforeCreate: function () {
		this.uid = uid.toString();
		uid += 1;
	}
};

</script>
