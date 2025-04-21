<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div id="content">
	<div id="left">
		<form method="POST" action="?/test" use:enhance>
			<button>test</button>
		</form>
	</div>
	<div id="right">
		<pre style="color: blue;">{form?.sql}</pre>
		<pre>{JSON.stringify(form?.mensagem, null, 2)}</pre>
	</div>
</div>

<style>
	button {
		text-align: left;
	}

	#content,
	:global(html),
	:global(body) {
		height: 98%;
	}
	#left {
		float: left;
		width: 50%;
		height: 100%;
		overflow: scroll;
	}
	#right {
		float: left;
		width: 50%;
		height: 100%;
		overflow: scroll;
	}
</style>
