from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.tools import tools
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv

load_dotenv()

def main():
    model = ChatOpenAI(temperature=0)

    tools=[]
    agent_executor = create_react_agent(model, tools)

    print("Welcome!! I'm your AI assistent. Type 'quite' to exit.")
    print("You can ask me to perform calculations or chat with me")

    while true:
        user_input=input(\nYou: ").strip()

        if user_input=="quit":
            break

        print("\n assistenet:, end="")
        for chunk in agent_executor.stram(
            {"messages":[HumanMessage(content=user_input)]}
        ):
        if "agent" in chunk and "messages" in chunk["agent"]:
            for message in chunk["agent"]["meassages"]:
                print(message.content, end="")

        if__name__=="__main__":
            main()
