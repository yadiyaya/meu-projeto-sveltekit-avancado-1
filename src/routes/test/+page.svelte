<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div id="content">
	<div id="left">
		<form method="POST" action="?/insert" use:enhance>
			<button> insert one </button>
		</form>
		<form method="POST" action="?/insertseveral" use:enhance>
			<button>insert several</button>
		</form>
		<form method="POST" action="?/update" use:enhance>
			<button>update</button>
		</form>
		<form method="POST" action="?/del" use:enhance>
			<button>delete</button>
		</form>
		<form method="POST" action="?/select" use:enhance>
			<button>select</button>
		</form>
		<form method="POST" action="?/selectcolumn" use:enhance>
			<button>select column</button>
		</form>
		<form method="POST" action="?/where" use:enhance>
			<button>where</button>
		</form>
		<form method="POST" action="?/orderby" use:enhance>
			<button>order by</button>
		</form>
		<form method="POST" action="?/orderbydesc" use:enhance>
			<button>order by desc</button>
		</form>
		<form method="POST" action="?/orderbyseveral" use:enhance>
			<button>order by several</button>
		</form>
		<form method="POST" action="?/limit" use:enhance>
			<button>limit</button>
		</form>
		<form method="POST" action="?/offset" use:enhance>
			<button>offset</button>
		</form>
		<form method="POST" action="?/orderbylimit" use:enhance>
			<button>order by limit</button>
		</form>
		<form method="POST" action="?/paginacao" use:enhance>
			<button>paginacao</button>
		</form>
		<form method="POST" action="?/innerjoin" use:enhance>
			<button>inner join</button>
		</form>
		<form method="POST" action="?/leftjoin" use:enhance>
			<button>left join</button>
		</form>
		<form method="POST" action="?/rightjoin" use:enhance>
			<button>right join</button>
		</form>
		<form method="POST" action="?/count" use:enhance>
			<button>count</button>
		</form>
		<form method="POST" action="?/groupby" use:enhance>
			<button>group by</button>
		</form>
		<form method="POST" action="?/sum" use:enhance>
			<button>sum</button>
		</form>
		<form method="POST" action="?/minmax" use:enhance>
			<button>max min</button>
		</form>
		<form method="POST" action="?/transacoes" use:enhance>
			<button>transaction</button>
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
