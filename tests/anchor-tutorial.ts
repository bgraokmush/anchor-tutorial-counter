import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorTutorial } from "../target/types/anchor_tutorial";
import { assert, expect } from "chai";

describe("anchor-tutorial", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorTutorial as Program<AnchorTutorial>;

  const my_account = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .signers([my_account])
      .rpc();

    const account = program.account.myAccount.fetch(my_account.publicKey);

    console.log("Your transaction signature", tx);
    expect((await account).data.eq(new anchor.BN(0)));
  });

  it("Can Increment!", async () => {
    // Add your test here.
    const tx = await program.methods
      .increment()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();

    const account = program.account.myAccount.fetch(my_account.publicKey);

    console.log("Your transaction signature", tx);
    expect((await account).data.eq(new anchor.BN(1)));
  });

  it("Can Decrement!", async () => {
    // Add your test here.
    const tx = await program.methods
      .decrement()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();

    const account = program.account.myAccount.fetch(my_account.publicKey);

    console.log("Your transaction signature", tx);
    expect((await account).data.eq(new anchor.BN(0)));
  });
  it("Can Update!", async () => {
    // Add your test here.
    const tx = await program.methods
      .update(new anchor.BN(10))
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();

    const account = program.account.myAccount.fetch(my_account.publicKey);

    console.log("Your transaction signature", tx);
    expect((await account).data.eq(new anchor.BN(10)));
  });
});
