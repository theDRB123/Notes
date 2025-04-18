
[Github Discussion Thread](https://github.com/block-core/angor/discussions/322)
### Refractoring Changes Plan

- First task is the unlink everything that uses wallet words directly
- Instead should be using an Extended Public Key for all their derivation

### Derive Operations
- currently using wallet words all over the place to derive, 
- check if the extendedPubKey derived from the wallet words can be directly used



## Referencing from the Wasabi Wallet's implementation


```c# //NBitcoinExtentions.cs
	public static void AddKeyPath(this PSBT psbt, HDFingerprint fp, HdPubKey hdPubKey, Script script)
	{
		var rootKeyPath = new RootedKeyPath(fp, hdPubKey.FullKeyPath);
		psbt.AddKeyPath(hdPubKey.PubKey, rootKeyPath, script);
	}
```

```c# NBitcoinExtensions.cs
public static void AddKeyPaths(this PSBT psbt, KeyManager keyManager)
	{
		if (keyManager.MasterFingerprint.HasValue)
		{
			var fp = keyManager.MasterFingerprint.Value;

			// Add input keypaths.
			foreach (var script in psbt.Inputs.Select(x => x.WitnessUtxo?.ScriptPubKey).ToArray())
			{
				if (script is { })
				{
					if (keyManager.TryGetKeyForScriptPubKey(script, out HdPubKey? hdPubKey))
					{
						psbt.AddKeyPath(fp, hdPubKey, script);
					}
				}
			}

			// Add output keypaths.
			foreach (var script in psbt.Outputs.Select(x => x.ScriptPubKey).ToArray())
			{
				if (keyManager.TryGetKeyForScriptPubKey(script, out HdPubKey? hdPubKey))
				{
					psbt.AddKeyPath(fp, hdPubKey, script);
				}
			}
		}
	}
```



changing the derivation to use unhardened childs for extPubKey